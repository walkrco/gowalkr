# =============================================================================
# S3 Bucket - Frontend Hosting
# =============================================================================

# Main S3 bucket for static website hosting
resource "aws_s3_bucket" "frontend" {
  bucket = var.domain_name

  tags = {
    Name = "${var.app_name}-frontend"
  }
}

# Configure S3 bucket as static website
resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  # Default document for directory requests
  index_document {
    suffix = "index.html"
  }

  # Redirect all errors to index.html for SPA routing
  error_document {
    key = "index.html"
  }
}

# Enable versioning for frontend bucket (allows rollback if needed)
resource "aws_s3_bucket_versioning" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  
  versioning_configuration {
    status = "Enabled"
  }
}

# Enable server-side encryption for data at rest
resource "aws_s3_bucket_server_side_encryption_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block all public access - access only through CloudFront
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 bucket policy - Grant CloudFront access to bucket contents
resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.frontend.arn}/*"
        Condition = {
          StringEquals = {
            # Only allow access from our specific CloudFront distribution
            "AWS:SourceArn" = aws_cloudfront_distribution.frontend.arn
          }
        }
      }
    ]
  })
}