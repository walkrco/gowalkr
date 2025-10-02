# =============================================================================
# Provider Configuration
# =============================================================================

# Default provider for primary region
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.app_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Provider for us-east-1 (required for CloudFront ACM certificates)
# CloudFront only accepts certificates from us-east-1 region
provider "aws" {
  alias  = "certificate"
  region = var.certificate_region

  default_tags {
    tags = {
      Project     = var.app_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Cross-account provider for Route 53 hosted zone management
# Used when Route 53 hosted zone exists in a different AWS account
provider "aws" {
  alias  = "management"
  region = var.aws_region

  assume_role {
    role_arn = var.route53_role_arn
  }

  default_tags {
    tags = {
      Project     = var.app_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# =============================================================================
# Data Sources
# =============================================================================

# Get current AWS account ID
data "aws_caller_identity" "current" {}

# Get current AWS region
data "aws_region" "current" {}

# Reference the existing Route 53 hosted zone
# This hosted zone is managed in the management account
data "aws_route53_zone" "main" {
  provider = aws.management
  zone_id  = var.hosted_zone_id
}