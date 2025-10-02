# =============================================================================
# Output Values
# =============================================================================

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name for frontend hosting"
  value       = aws_s3_bucket.frontend.id
}

output "api_gateway_endpoint" {
  description = "API Gateway endpoint URL"
  value       = aws_apigatewayv2_stage.workout_api.invoke_url
}

output "dynamodb_table_name" {
  description = "DynamoDB table name"
  value       = aws_dynamodb_table.workouts.name
}

output "lambda_workout_function_name" {
  description = "Workout generator Lambda function name"
  value       = aws_lambda_function.workout_generator.function_name
}

output "lambda_contact_function_name" {
  description = "Contact form Lambda function name"
  value       = aws_lambda_function.contact_form.function_name
}

output "certificate_arn" {
  description = "ACM certificate ARN"
  value       = aws_acm_certificate.frontend.arn
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}