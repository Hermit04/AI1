# Authentication Setup

This project uses **better-auth** with **Convex** for authentication, and **TanStack Form** with **Zod** for form validation.

## Features Implemented

### 1. Email/Password Authentication
- ✅ Login with email and password
- ✅ Signup with email, password, and name
- ✅ Form validation using Zod
- ✅ Real-time field validation

### 2. OAuth Support (Google)
- ✅ Google OAuth login/signup configured
- ⚠️ Requires environment variables to be set (see below)

### 3. Form Validation
- ✅ TanStack Form integration
- ✅ Zod validation schema
- ✅ Real-time error messages
- ✅ Password confirmation matching
- ✅ Minimum length validation for passwords

## Environment Variables Required

### Backend (Convex)

Add these to your Convex environment (`convex env set` or dashboard):

```bash
SITE_URL=http://localhost:3001  # Your Next.js app URL

# Optional: For Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend (Next.js)

Create/update `.env.local` in `apps/web/`:

```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CONVEX_SITE_URL=your_convex_site_url
```

## Files Modified/Created

### Frontend Components
- [apps/web/src/components/login-form.tsx](apps/web/src/components/login-form.tsx) - Login form with validation
- [apps/web/src/components/signup-form.tsx](apps/web/src/components/signup-form.tsx) - Signup form with validation

### Backend (Convex)
- [packages/backend/convex/auth.ts](packages/backend/convex/auth.ts) - Auth configuration with Google OAuth support
- [packages/backend/convex/auth.config.ts](packages/backend/convex/auth.config.ts) - Auth config provider
- [packages/backend/convex/http.ts](packages/backend/convex/http.ts) - HTTP routes for auth
- [packages/backend/convex/schema.ts](packages/backend/convex/schema.ts) - Database schema

### API Routes
- [apps/web/src/app/api/auth/[...all]/route.ts](apps/web/src/app/api/auth/[...all]/route.ts) - Next.js API route handler

### Auth Utilities
- [apps/web/src/lib/auth-client.ts](apps/web/src/lib/auth-client.ts) - Client-side auth helper
- [apps/web/src/lib/auth-server.ts](apps/web/src/lib/auth-server.ts) - Server-side auth helper

## Usage

### Login Form

```tsx
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return <LoginForm />
}
```

### Signup Form

```tsx
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return <SignupForm />
}
```

### Getting Current User (Server-side)

```tsx
import { getCurrentUser } from "@AI1/backend"
import { preloadAuthQuery } from "@/lib/auth-server"

export default async function DashboardPage() {
  const user = await preloadAuthQuery(getCurrentUser)
  
  if (!user) {
    redirect("/login")
  }
  
  return <div>Welcome, {user.name}!</div>
}
```

### Getting Current User (Client-side)

```tsx
"use client"

import { authClient } from "@/lib/auth-client"
import { useQuery } from "convex/react"
import { api } from "@AI1/backend"

export function UserProfile() {
  const { data: session } = authClient.useSession()
  const user = useQuery(api.auth.getCurrentUser)
  
  return <div>Welcome, {user?.name}!</div>
}
```

## Form Validation Details

### Login Form
- **Email**: Must be a valid email address
- **Password**: Minimum 6 characters

### Signup Form
- **Name**: Minimum 2 characters
- **Email**: Must be a valid email address
- **Password**: Minimum 8 characters
- **Confirm Password**: Must match password field

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `{SITE_URL}/api/auth/callback/google`
6. Copy Client ID and Client Secret to environment variables

## Error Handling

Both forms include:
- Real-time field validation
- Toast notifications for success/error
- Loading states during submission
- Automatic redirect to dashboard on success

## Security Features

- ✅ CSRF protection via better-auth
- ✅ Password hashing (handled by better-auth)
- ✅ Secure session management
- ✅ Email verification support (currently disabled)
- ✅ Rate limiting (via Convex)

## Next Steps

To enable additional features:

1. **Email Verification**: Set `requireEmailVerification: true` in auth.ts
2. **Password Reset**: Add forgot password flow
3. **Two-Factor Authentication**: Add 2FA plugin to better-auth
4. **Additional OAuth Providers**: Add GitHub, Discord, etc.
5. **Session Management**: Implement logout, session refresh

## Troubleshooting

### "Failed to login"
- Check if Convex is running
- Verify environment variables are set
- Check browser console for detailed errors

### "Passwords do not match"
- This validation happens on form submission
- Ensure both password fields are filled

### Google OAuth not working
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Check redirect URI in Google Console matches your SITE_URL
- Ensure Google+ API is enabled

## Dependencies

```json
{
  "@tanstack/react-form": "^1.27.3",
  "@tanstack/zod-form-adapter": "^0.42.1",
  "better-auth": "1.4.9",
  "@convex-dev/better-auth": "^0.10.9",
  "zod": "^4.3.6",
  "sonner": "^2.0.7"
}
```
