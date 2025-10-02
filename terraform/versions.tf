# =============================================================================
# Terraform and Provider Version Constraints
# =============================================================================

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # configure for remote state management
  backend "s3" {
    bucket  = "gowalkr-state"
    key     = "terraform.tfstate"
    region  = "eu-west-2"
    encrypt = true
  }
}