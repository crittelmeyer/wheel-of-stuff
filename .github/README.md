# GitHub Actions Setup

## Required Secrets

Add the following secrets to your GitHub repository:

1. `AWS_ACCESS_KEY_ID` - AWS access key with permissions to deploy infrastructure
2. `AWS_SECRET_ACCESS_KEY` - AWS secret access key

## Permissions Required

The AWS credentials should have permissions to:
- Create/manage S3 buckets
- Create/manage CloudFront distributions
- Create/manage API Gateway
- Create/manage Lambda functions
- Create/manage IAM roles
- Create/manage VPCs
- Create/manage CloudFormation stacks

## Workflows

- `deploy-frontend.yml` - Automatically deploys frontend changes to AWS on push to main branch