# Wheel of Stuff Infrastructure

This package contains the AWS CDK infrastructure code for the Wheel of Stuff application.

## Prerequisites

- AWS CLI configured with appropriate credentials
- Node.js 20.x
- AWS CDK CLI: `npm install -g aws-cdk`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Bootstrap CDK (first time only):
   ```bash
   npm run cdk bootstrap
   ```

## Deployment

To deploy the infrastructure:

```bash
npm run deploy
```

To deploy with a specific environment:

```bash
npm run cdk deploy -- --context environment=dev
```

## Destruction

To destroy the infrastructure:

```bash
npm run destroy
```

## Resources Created

- S3 bucket for frontend hosting
- CloudFront distribution
- API Gateway
- Lambda function (health check)
- IAM roles
- VPC for future RDS integration