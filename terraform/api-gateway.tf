# =============================================================================
# API Gateway HTTP API
# =============================================================================

# CloudWatch log group for API Gateway
resource "aws_cloudwatch_log_group" "api_log_group" {
  name              = "/aws/apigateway/${var.app_name}-api"
  retention_in_days = var.log_retention_days

  tags = {
    Name = "${var.app_name}-api-logs"
  }
}

# HTTP API Gateway for workout and contact endpoints
resource "aws_apigatewayv2_api" "workout_api" {
  name          = "${var.app_name}-api"
  protocol_type = "HTTP"
  description   = "Walkr Workout Generator API"

  # CORS configuration for browser access
  cors_configuration {
    allow_credentials = false
    allow_headers     = ["content-type", "x-amz-date", "authorization", "x-api-key"]
    allow_methods     = ["*"]
    allow_origins     = ["https://${var.domain_name}", "https://www.${var.domain_name}"]
    expose_headers    = ["date", "keep-alive"]
    max_age           = var.cors_max_age # Cache preflight requests for 24 hours
  }

  tags = {
    Name = "${var.app_name}-api"
  }
}

# API Gateway stage (production)
resource "aws_apigatewayv2_stage" "workout_api" {
  api_id = aws_apigatewayv2_api.workout_api.id

  name        = var.api_stage_name
  auto_deploy = true # Automatically deploy API changes

  # Enable access logging for debugging and monitoring
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_log_group.arn

    format = jsonencode({
      requestId      = "$context.requestId"
      sourceIp       = "$context.identity.sourceIp"
      requestTime    = "$context.requestTime"
      protocol       = "$context.protocol"
      httpMethod     = "$context.httpMethod"
      resourcePath   = "$context.resourcePath"
      status         = "$context.status"
      responseLength = "$context.responseLength"
    })
  }

  tags = {
    Name = "${var.app_name}-api-stage"
  }
}

# =============================================================================
# API Gateway Integrations
# =============================================================================

# Integration for workout generator Lambda
resource "aws_apigatewayv2_integration" "workout_generator" {
  api_id = aws_apigatewayv2_api.workout_api.id

  integration_uri        = aws_lambda_function.workout_generator.invoke_arn
  integration_type       = "AWS_PROXY" # Lambda proxy integration
  integration_method     = "POST"
  payload_format_version = "2.0"
}

# Integration for contact form Lambda
resource "aws_apigatewayv2_integration" "contact_form" {
  api_id = aws_apigatewayv2_api.workout_api.id

  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  integration_type       = "AWS_PROXY" # Lambda proxy integration
  integration_method     = "POST"
  payload_format_version = "2.0"
}

# =============================================================================
# API Gateway Routes
# =============================================================================

# Route for workout generation endpoint
resource "aws_apigatewayv2_route" "workout_generator" {
  api_id = aws_apigatewayv2_api.workout_api.id

  route_key = "POST /api/generateWorkout"
  target    = "integrations/${aws_apigatewayv2_integration.workout_generator.id}"
}

# Route for contact form endpoint
resource "aws_apigatewayv2_route" "contact_form" {
  api_id = aws_apigatewayv2_api.workout_api.id

  route_key = "POST /api/contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact_form.id}"
}

# =============================================================================
# Lambda Permissions - API Gateway Invocation
# =============================================================================

# Grant API Gateway permission to invoke workout generator Lambda
resource "aws_lambda_permission" "api_gw_workout" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.workout_generator.function_name
  principal     = "apigateway.amazonaws.com"

  # Allow invocation from any route in this API
  source_arn = "${aws_apigatewayv2_api.workout_api.execution_arn}/*/*"
}

# Grant API Gateway permission to invoke contact form Lambda
resource "aws_lambda_permission" "api_gw_contact" {
  statement_id  = "AllowExecutionFromAPIGatewayContact"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"

  # Allow invocation from any route in this API
  source_arn = "${aws_apigatewayv2_api.workout_api.execution_arn}/*/*"
}