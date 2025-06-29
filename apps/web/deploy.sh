#!/bin/bash

# Build the frontend
echo "Building frontend..."
pnpm build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# Deploy infrastructure if needed
echo "Deploying infrastructure..."
cd ../../packages/deployment/infrastructure
pnpm cdk deploy --require-approval never

# Get outputs from CloudFormation
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name WheelOfStuffBackendProd --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" --output text)
DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name WheelOfStuffBackendProd --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text)

# Sync files to S3
echo "Syncing files to S3..."
cd ../../../apps/web
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"