# =============================================================================
# CloudFront Distribution - CDN
# =============================================================================

# CloudFront Origin Access Control for secure S3 access
resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${var.domain_name}-oac"
  description                       = "OAC for ${var.domain_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Main CloudFront distribution
resource "aws_cloudfront_distribution" "frontend" {
  # S3 origin for static content
  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
    origin_id                = "S3-${var.domain_name}"
  }

  # API Gateway origin for backend API
  origin {
    domain_name = "${aws_apigatewayv2_api.workout_api.id}.execute-api.${var.aws_region}.amazonaws.com"
    origin_id   = "API-${var.domain_name}"
    origin_path = "/prod"
    
    custom_origin_config {
      http_port              = 443
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Walkr frontend distribution"
  default_root_object = "index.html"

  # Custom domain names for the distribution
  aliases = [var.domain_name, "www.${var.domain_name}"]

  # Default cache behavior for static content (S3)
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.domain_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600    # 1 hour
    max_ttl                = 86400   # 24 hours
    compress               = true
  }

  # Cache behavior for contact API endpoint
  ordered_cache_behavior {
    path_pattern     = "/api/contact"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "API-${var.domain_name}"

    forwarded_values {
      query_string = true
      # Forward necessary headers for API requests
      headers      = ["Authorization", "Content-Type"]
      cookies {
        forward = "none"
      }
    }

    # No caching for API endpoints
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  # Cache behavior for workout generation API endpoint
  ordered_cache_behavior {
    path_pattern     = "/api/generateWorkout"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "API-${var.domain_name}"

    forwarded_values {
      query_string = true
      # Forward necessary headers for API requests
      headers      = ["Authorization", "Content-Type"]
      cookies {
        forward = "none"
      }
    }

    # No caching for API endpoints
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  # Use all edge locations for best global performance
  price_class = "PriceClass_All"

  # No geographic restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # SSL/TLS configuration
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.frontend.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # Custom error response for SPA routing (404 -> index.html)
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  # Custom error response for SPA routing (403 -> index.html)
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  tags = {
    Name = "${var.app_name}-distribution"
  }
}