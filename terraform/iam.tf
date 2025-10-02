# =============================================================================
# IAM Role and Policies - Lambda Execution
# =============================================================================

# IAM role for Lambda functions
resource "aws_iam_role" "lambda_role" {
  name = "${var.app_name}-lambda-role"

  # Trust policy allowing Lambda service to assume this role
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.app_name}-lambda-role"
  }
}

# IAM policy defining Lambda permissions
resource "aws_iam_policy" "lambda_policy" {
  name        = "${var.app_name}-lambda-policy"
  description = "Policy for Lambda functions to access CloudWatch, DynamoDB, and SES"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.workouts.arn,
          "${aws_dynamodb_table.workouts.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"  # SES doesn't support resource-level permissions
      }
    ]
  })

  tags = {
    Name = "${var.app_name}-lambda-policy"
  }
}

# Attach the policy to the role
resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}