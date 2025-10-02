# =============================================================================
# Terraform Variables - Production Configuration
# =============================================================================

app_name     = "walkr"
environment  = "prod"
aws_region   = "eu-west-2"
domain_name  = "gowalkr.com"

# Route 53 Configuration (from your existing setup)
hosted_zone_id   = "Z0143137QHNQ1S0TYPKU"
route53_role_arn = "arn:aws:iam::784074784474:role/Route53CrossAccountRole"

# Email Configuration
recipient_email = "walkrco@outlook.com"
sender_email    = "noreply@gowalkr.com"

# Lambda Configuration
lambda_memory_size = {
  workout_generator = 512
  contact_form      = 256
}

# Logging Configuration
log_retention_days = 14

# Lambda timeout
lambda_timeout = 30