# WALKR - AI Workout Generator

Generate personalized workouts in seconds. Perfect for TikTok fitness challenges!

## Features

- **Instant Workouts**: Generate custom workouts in under 3 seconds
- **440+ Exercises**: Comprehensive exercise database across all fitness goals
- **Equipment Flexible**: Bodyweight, dumbbells, or full gym options
- **Social Ready**: Built-in sharing for TikTok, Instagram, and Twitter
- **Built-in Timer**: Execute workouts with guided timing and rest periods

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: AWS Lambda, DynamoDB, API Gateway
- **Infrastructure**: Terraform, CloudFront, S3
- **Deployment**: Serverless architecture

## Development

### Prerequisites
- Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup
```sh
# Clone the repository
git clone https://github.com/YOURNEWUSERNAME/gowalkr.git

# Navigate to project directory
cd gowalkr

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The project uses Terraform for AWS infrastructure deployment:

```sh
# Navigate to terraform directory
cd terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Deploy infrastructure
terraform apply
```

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── data/          # Exercise database
├── utils/         # Utility functions
└── hooks/         # Custom React hooks

lambda/            # AWS Lambda functions
terraform/         # Infrastructure as Code
```

## License

© 2025 WALKR. All rights reserved.