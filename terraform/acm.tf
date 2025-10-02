# =============================================================================
# ACM Certificate - HTTPS Support
# =============================================================================

# SSL/TLS certificate for HTTPS (must be in us-east-1 for CloudFront)
resource "aws_acm_certificate" "frontend" {
  provider          = aws.certificate
  domain_name       = var.domain_name
  validation_method = "DNS"

  # Include www subdomain in certificate
  subject_alternative_names = [
    "www.${var.domain_name}"
  ]

  # Ensure new certificate is created before destroying old one
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.app_name}-certificate"
  }
}

# Create DNS validation records in Route 53 (management account)
resource "aws_route53_record" "cert_validation" {
  provider = aws.management

  # Create a validation record for each domain in the certificate
  for_each = {
    for dvo in aws_acm_certificate.frontend.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = var.hosted_zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

# Wait for certificate validation to complete
resource "aws_acm_certificate_validation" "frontend" {
  provider                = aws.certificate
  certificate_arn         = aws_acm_certificate.frontend.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}