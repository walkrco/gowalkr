# Cognito User Pool
resource "aws_cognito_user_pool" "walkr_user_pool" {
  name = "${var.app_name}-user-pool"

  # User attributes
  alias_attributes         = ["email"]
  auto_verified_attributes = ["email"]

  # Username configuration
  username_configuration {
    case_sensitive = false
  }

  # Password policy
  password_policy {
    minimum_length                   = 8
    require_lowercase               = true
    require_numbers                 = true
    require_symbols                 = false
    require_uppercase               = true
    temporary_password_validity_days = 7
  }

  # Account recovery
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # Email configuration
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  # User pool add-ons
  user_pool_add_ons {
    advanced_security_mode = "ENFORCED"
  }

  # Verification message templates
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Your WALKR verification code"
    email_message        = "Your WALKR verification code is {####}"
  }

  # Device configuration
  device_configuration {
    challenge_required_on_new_device      = false
    device_only_remembered_on_user_prompt = false
  }

  # Schema for additional user attributes
  schema {
    attribute_data_type = "String"
    name               = "email"
    required           = true
    mutable           = true
  }

  schema {
    attribute_data_type = "String"
    name               = "given_name"
    required           = false
    mutable           = true
  }

  schema {
    attribute_data_type = "String"
    name               = "family_name"
    required           = false
    mutable           = true
  }

  # Custom attribute for fitness goals
  schema {
    attribute_data_type = "String"
    name               = "fitness_goal"
    required           = false
    mutable           = true
    developer_only_attribute = false
  }

  tags = {
    Name        = "${var.app_name}-user-pool"
    Environment = var.environment
  }
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "walkr_user_pool_client" {
  name         = "${var.app_name}-user-pool-client"
  user_pool_id = aws_cognito_user_pool.walkr_user_pool.id

  # Client settings
  generate_secret                      = false
  prevent_user_existence_errors        = "ENABLED"
  enable_token_revocation             = true
  enable_propagate_additional_user_context_data = false

  # Authentication flows
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH", 
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]

  # Token validity
  access_token_validity                = 60    # 1 hour
  id_token_validity                   = 60    # 1 hour  
  refresh_token_validity              = 30    # 30 days
  token_validity_units {
    access_token  = "minutes"
    id_token      = "minutes"
    refresh_token = "days"
  }

  # OAuth settings (for future social login)
  supported_identity_providers = ["COGNITO"]
  
  callback_urls = [
    "https://${var.domain_name}",
    "https://www.${var.domain_name}",
    "http://localhost:5173" # For local development
  ]
  
  logout_urls = [
    "https://${var.domain_name}",
    "https://www.${var.domain_name}",
    "http://localhost:5173"
  ]

  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                = ["email", "openid", "profile"]

  # Read and write attributes
  read_attributes = [
    "email",
    "email_verified", 
    "given_name",
    "family_name",
    "custom:fitness_goal"
  ]

  write_attributes = [
    "email",
    "given_name", 
    "family_name",
    "custom:fitness_goal"
  ]
}

# Cognito Identity Pool
resource "aws_cognito_identity_pool" "walkr_identity_pool" {
  identity_pool_name               = "${var.app_name}-identity-pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.walkr_user_pool_client.id
    provider_name           = aws_cognito_user_pool.walkr_user_pool.endpoint
    server_side_token_check = false
  }

  tags = {
    Name        = "${var.app_name}-identity-pool"
    Environment = var.environment
  }
}

# IAM role for authenticated users
resource "aws_iam_role" "cognito_authenticated_role" {
  name = "${var.app_name}-cognito-authenticated-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = "cognito-identity.amazonaws.com"
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "cognito-identity.amazonaws.com:aud" = aws_cognito_identity_pool.walkr_identity_pool.id
          }
          "ForAnyValue:StringLike" = {
            "cognito-identity.amazonaws.com:amr" = "authenticated"
          }
        }
      }
    ]
  })

  tags = {
    Name        = "${var.app_name}-cognito-authenticated-role"
    Environment = var.environment
  }
}

# IAM policy for authenticated users
resource "aws_iam_role_policy" "cognito_authenticated_policy" {
  name = "${var.app_name}-cognito-authenticated-policy"
  role = aws_iam_role.cognito_authenticated_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cognito-sync:*",
          "cognito-identity:*"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "apigateway:POST",
          "apigateway:GET"
        ]
        Resource = [
          "${aws_apigatewayv2_api.workout_api.execution_arn}/*/*"
        ]
      }
    ]
  })
}

# Attach the role to the identity pool
resource "aws_cognito_identity_pool_roles_attachment" "walkr_identity_pool_roles" {
  identity_pool_id = aws_cognito_identity_pool.walkr_identity_pool.id

  roles = {
    "authenticated" = aws_iam_role.cognito_authenticated_role.arn
  }
}

# DynamoDB table for user profiles
resource "aws_dynamodb_table" "users" {
  name         = "${var.app_name}-users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name     = "email-index"
    hash_key = "email"
    projection_type = "ALL"
  }

  tags = {
    Name        = "${var.app_name}-users"
    Environment = var.environment
  }
}

# DynamoDB table for user workout history
resource "aws_dynamodb_table" "user_workouts" {
  name         = "${var.app_name}-user-workouts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "workoutId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "workoutId"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  global_secondary_index {
    name            = "userId-createdAt-index"
    hash_key        = "userId"
    range_key       = "createdAt"
    projection_type = "ALL"
  }

  tags = {
    Name        = "${var.app_name}-user-workouts"
    Environment = var.environment
  }
}