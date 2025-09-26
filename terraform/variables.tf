variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-2"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "gowalkr.com"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "walkr"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "hosted_zone_id" {
  description = "Route 53 hosted zone ID for gowalkr.com (from management account)"
  type        = string
  default     = "Z0143137QHNQ1S0TYPKU"
}

variable "management_account_id" {
  description = "Management account ID where domain is registered"
  type        = string
  default     = "784074784474"
}

variable "route53_role_arn" {
  description = "Cross-account Route53 role ARN"
  type        = string
  default     = "arn:aws:iam::784074784474:role/Route53CrossAccountRole"
}

variable "certificate_region" {
  description = "AWS region for ACM certificate (must be us-east-1 for CloudFront)"
  type        = string
  default     = "us-east-1"
}