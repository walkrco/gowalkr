# =============================================================================
# Input Variables
# =============================================================================

variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
  default     = "walkr"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "Primary AWS region for resources"
  type        = string
  default     = "eu-west-2"
}

variable "certificate_region" {
  description = "AWS region for ACM certificate (must be us-east-1 for CloudFront)"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Primary domain name for the application"
  type        = string
  default     = "gowalkr.com"
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID"
  type        = string
  default     = "Z0143137QHNQ1S0TYPKU"
}

variable "route53_role_arn" {
  description = "IAM role ARN for Route 53 access in management account"
  type        = string
  default     = "arn:aws:iam::784074784474:role/Route53CrossAccountRole"
}

variable "recipient_email" {
  description = "Email address to receive contact form submissions"
  type        = string
  default     = "walkrco@outlook.com"
}

variable "sender_email" {
  description = "Verified SES sender email address"
  type        = string
  default     = "noreply@gowalkr.com"
}

variable "lambda_memory_size" {
  description = "Memory size for Lambda functions (MB)"
  type = object({
    workout_generator = number
    contact_form      = number
  })
  default = {
    workout_generator = 512
    contact_form      = 256
  }
}

variable "log_retention_days" {
  description = "CloudWatch log retention period in days"
  type        = number
  default     = 14
}

variable "lambda_timeout" {
  description = "Lambda function timeout in seconds"
  type        = number
  default     = 30
}

variable "api_stage_name" {
  description = "API Gateway stage name"
  type        = string
  default     = "prod"
}

variable "lambda_runtime" {
  description = "Lambda runtime version"
  type        = string
  default     = "nodejs22.x"
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_All"
}

variable "cors_max_age" {
  description = "CORS preflight cache duration in seconds"
  type        = number
  default     = 86400
}