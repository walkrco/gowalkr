# =============================================================================
# Lambda Functions
# =============================================================================

# CloudWatch log group for workout generator Lambda
resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/workout-generator"
  retention_in_days = var.log_retention_days

  tags = {
    Name = "${var.app_name}-workout-logs"
  }
}

# CloudWatch log group for contact form Lambda
resource "aws_cloudwatch_log_group" "contact_lambda_log_group" {
  name              = "/aws/lambda/contact-form"
  retention_in_days = var.log_retention_days

  tags = {
    Name = "${var.app_name}-contact-logs"
  }
}

# Lambda function for workout generation
resource "aws_lambda_function" "workout_generator" {
  filename      = "../lambda-deployment.zip"
  function_name = "workout-generator"
  role          = aws_iam_role.lambda_role.arn
  handler       = "dist/index.handler"
  runtime       = "nodejs22.x"
  timeout       = var.lambda_timeout
  memory_size   = var.lambda_memory_size.workout_generator

  # Trigger re-deployment when zip file changes
  source_code_hash = filebase64sha256("../lambda-deployment.zip")

  # Environment variables for Lambda
  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.workouts.name
      DOMAIN_NAME    = var.domain_name
      NODE_ENV       = var.environment
    }
  }

  # Ensure dependencies are created first
  depends_on = [
    aws_iam_role_policy_attachment.lambda_policy_attachment,
    aws_cloudwatch_log_group.lambda_log_group,
  ]

  tags = {
    Name = "${var.app_name}-workout-generator"
  }
}

# Lambda function for contact form
resource "aws_lambda_function" "contact_form" {
  filename      = "../lambda-deployment.zip"
  function_name = "contact-form"
  role          = aws_iam_role.lambda_role.arn
  handler       = "dist/contact.handler"
  runtime       = "nodejs22.x"
  timeout       = var.lambda_timeout
  memory_size   = var.lambda_memory_size.contact_form

  # Trigger re-deployment when zip file changes
  source_code_hash = filebase64sha256("../lambda-deployment.zip")

  # Environment variables for Lambda
  environment {
    variables = {
      DOMAIN_NAME     = var.domain_name
      NODE_ENV        = var.environment
      RECIPIENT_EMAIL = var.recipient_email
      SENDER_EMAIL    = var.sender_email
    }
  }

  # Ensure dependencies are created first
  depends_on = [
    aws_iam_role_policy_attachment.lambda_policy_attachment,
    aws_cloudwatch_log_group.contact_lambda_log_group,
  ]

  tags = {
    Name = "${var.app_name}-contact-form"
  }
}