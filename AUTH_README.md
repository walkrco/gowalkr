# WALKR Authentication System

## Overview

WALKR uses AWS Cognito for authentication via Amplify Libraries. This provides secure user registration, login, email verification, and session management.

## Architecture

```
Frontend (React) → Amplify Libraries → AWS Cognito User Pool
```

## File Structure

```
src/
├── contexts/
│   └── auth-context.tsx          # Main auth logic & state management
├── components/
│   ├── auth/
│   │   └── auth-modal.tsx        # Sign in/up modal UI
│   └── ui/
│       ├── dialog.tsx            # Modal wrapper component
│       ├── input.tsx             # Form input component
│       └── tabs.tsx              # Tab switching component
├── lib/
│   └── aws-config.ts             # AWS/Cognito configuration
└── main.tsx                      # App entry point with AuthProvider
```

## Core Files Explained

### 1. `src/contexts/auth-context.tsx`
**Purpose**: Central authentication state management

**What it does**:
- Configures Amplify with Cognito settings
- Provides React context for auth state (`user`, `loading`)
- Exposes auth methods (`signUp`, `signIn`, `signOut`, etc.)
- Automatically checks if user is logged in on app load

**Key exports**:
- `AuthProvider` - Wraps entire app
- `useAuth()` - Hook to access auth state/methods

### 2. `src/components/auth/auth-modal.tsx`
**Purpose**: User interface for authentication

**What it does**:
- Renders sign in/sign up forms
- Handles email verification flow
- Shows loading states and error messages
- Switches between different auth states (login, register, verify)

**Key features**:
- Tabbed interface (Sign In / Sign Up)
- Email verification with resend functionality
- Form validation and error handling

### 3. `src/lib/aws-config.ts`
**Purpose**: AWS Cognito configuration

**What it does**:
- Defines Cognito User Pool settings
- Reads environment variables
- Provides config for Amplify initialization

**Environment variables needed**:
```env
VITE_AWS_REGION=eu-west-2
VITE_COGNITO_USER_POOL_ID=your_pool_id
VITE_COGNITO_USER_POOL_CLIENT_ID=your_client_id
VITE_COGNITO_IDENTITY_POOL_ID=your_identity_pool_id
```

### 4. `src/main.tsx`
**Purpose**: App initialization with auth

**What it does**:
- Wraps entire app with `AuthProvider`
- Ensures auth context is available everywhere

## Authentication Flow

### 1. Sign Up Flow
```
User fills form → signUp() → Cognito creates user → Email sent → 
User enters code → confirmSignUp() → Account verified → Can sign in
```

### 2. Sign In Flow
```
User enters credentials → signIn() → Cognito validates → 
Session created → User state updated → UI shows logged in state
```

### 3. Session Management
```
App loads → checkAuthState() → Cognito checks session → 
If valid: Set user state → If invalid: Show sign in
```

## UI Integration

### Navigation Buttons
Each page shows different buttons based on auth state:

**Logged out**: `SIGN IN` button → Opens auth modal
**Logged in**: `username` + logout icon

### Auth Modal States
1. **Sign In Tab**: Email + password form
2. **Sign Up Tab**: Name + email + password form  
3. **Verification**: 6-digit code input + resend option

## Environment Setup

### Development
1. Copy `.env.example` to `.env`
2. Add temporary values to avoid errors:
```env
VITE_COGNITO_USER_POOL_ID=temp
VITE_COGNITO_USER_POOL_CLIENT_ID=temp
# ... etc
```

### Production
1. Deploy Terraform to create Cognito resources
2. Get real values from Terraform outputs
3. Update `.env` with actual Cognito IDs

## Key Dependencies

- `aws-amplify` - AWS SDK for authentication
- `@radix-ui/react-dialog` - Modal component
- `@radix-ui/react-tabs` - Tab switching
- `lucide-react` - Icons

## Security Features

- **Password requirements**: Minimum 8 characters
- **Email verification**: Required before account activation
- **Session management**: Automatic token refresh
- **Secure storage**: Tokens stored in secure browser storage
- **HTTPS only**: All communication encrypted

## Cost

- **Free tier**: 50,000 monthly active users
- **Beyond free tier**: $0.0055 per user/month
- **For 10 users**: Completely free

## Troubleshooting

### Common Issues

1. **"User Pool not found"**
   - Check environment variables
   - Ensure Terraform deployed successfully

2. **"Invalid verification code"**
   - Code expires after 24 hours
   - Use resend functionality

3. **"User already exists"**
   - Email already registered
   - Try sign in instead

### Debug Mode
Add to `.env` for detailed logs:
```env
VITE_DEBUG_AUTH=true
```

## Future Enhancements

- Password reset functionality
- Social login (Google, Apple)
- Multi-factor authentication
- User profile management
- Remember me functionality