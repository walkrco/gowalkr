#!/bin/bash

# Walkr AWS Deployment Script
set -e

echo "🚀 Starting Walkr deployment..."

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Prepare Lambda deployment
echo "🔧 Preparing Lambda function..."
cd lambda
npm install
npm run build
cd ..

# Initialize and apply Terraform
echo "🏗️ Deploying infrastructure with Terraform..."
cd terraform
terraform init
terraform plan
terraform apply -auto-approve

# Get outputs
API_URL=$(terraform output -raw api_gateway_url)
S3_BUCKET=$(terraform output -raw s3_bucket_name)
CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)

echo "📤 Uploading frontend to S3..."
aws s3 sync ../dist/ s3://$S3_BUCKET --delete

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 Frontend URL: https://gowalkr.com"
echo "🔗 API URL: $API_URL"
echo ""
echo "Next steps:"
echo "1. Update your DNS settings to point gowalkr.com to the CloudFront distribution"
echo "2. Validate the ACM certificate via DNS"
echo "3. Test the application"

cd ..