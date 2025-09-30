// AWS Cognito Configuration
// These values come from your Terraform outputs after deployment

export const awsConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'eu-west-2',
  
  // Cognito Configuration
  cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID || '',
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID || '',
    region: import.meta.env.VITE_AWS_REGION || 'eu-west-2',
  },

  // API Gateway
  api: {
    endpoints: [
      {
        name: "workouts",
        endpoint: import.meta.env.VITE_API_GATEWAY_URL || '',
        region: import.meta.env.VITE_AWS_REGION || 'eu-west-2',
      }
    ]
  }
};

// Amplify configuration format (if you want to use Amplify)
export const amplifyConfig = {
  Auth: {
    region: awsConfig.cognito.region,
    userPoolId: awsConfig.cognito.userPoolId,
    userPoolWebClientId: awsConfig.cognito.userPoolClientId,
    identityPoolId: awsConfig.cognito.identityPoolId,
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  API: {
    endpoints: awsConfig.api.endpoints
  }
};