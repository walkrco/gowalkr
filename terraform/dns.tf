# =============================================================================
# DNS Records - Route 53
# =============================================================================

# Main domain DNS record (gowalkr.com -> CloudFront)
resource "aws_route53_record" "main" {
  provider = aws.management
  zone_id  = var.hosted_zone_id
  name     = var.domain_name
  type     = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

# WWW subdomain DNS record (www.gowalkr.com -> CloudFront)
resource "aws_route53_record" "www" {
  provider = aws.management
  zone_id  = var.hosted_zone_id
  name     = "www.${var.domain_name}"
  type     = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}