# TrackNextUs - Sprint 1: Authentication Module

## 📁 Project Structure

```
TrackNextUs/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ButtonPrimary.tsx
│   │   └── InputField.tsx
│   ├── navigation/          # React Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── AuthStack.tsx
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SignupScreen.tsx
│   ├── services/           # Business logic (OOP classes)
│   │   ├── ApiClient.ts
│   │   └── AuthService.ts
│   ├── types/              # TypeScript type definitions
│   │   └── AuthTypes.ts
│   └── utils/              # Helper functions
│       └── validators.ts
├── App.tsx                 # Root component
├── package.json
└── tsconfig.json
```

## ✨ Features Implemented

### 1. **Authentication Screens**
- ✅ **LoginScreen**: Email/password login with validation
- ✅ **SignupScreen**: User registration with name, email, password
- ✅ **HomeScreen**: Post-authentication landing page

### 2. **Reusable Components**
- ✅ **InputField**: Text input with label, error display, validation
- ✅ **ButtonPrimary**: Primary action button with loading state

### 3. **Service Layer (OOP)**
- ✅ **ApiClient**: HTTP client singleton with GET/POST/PUT/DELETE methods
- ✅ **AuthService**: Authentication service singleton (register, login)

### 4. **Validation & Type Safety**
- ✅ Client-side validation (email, password, name)
- ✅ TypeScript types for all components and services
- ✅ Backend error handling and display

### 5. **Navigation**
- ✅ React Navigation v6 with native stack
- ✅ AuthStack: Login → Signup → Home flow
- ✅ Typed navigation with proper screen props

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# iOS only - install CocoaPods
cd ios
bundle install
bundle exec pod install
cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 🏗️ Architecture

### Clean Architecture Principles

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    (Screens + Components - Hooks)       │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│      (Services - OOP Classes)           │
├─────────────────────────────────────────┤
│         Data Layer                      │
│      (ApiClient - HTTP Requests)        │
└─────────────────────────────────────────┘
```

### Design Patterns Used

1. **Singleton Pattern**: `apiClient`, `authService` exported as singleton instances
2. **Dependency Injection**: Services receive dependencies via constructor
3. **Component Composition**: Reusable components composed in screens
4. **Functional Components**: UI layer uses hooks (useState, useEffect)
5. **OOP Services**: Business logic in class-based services

## 📝 Code Examples

### Using InputField Component
```tsx
<InputField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
  keyboardType="email-address"
  error={emailError}
/>
```

### Using ButtonPrimary Component
```tsx
<ButtonPrimary
  title="Login"
  onPress={handleLogin}
  loading={loading}
  disabled={!email || !password}
/>
```

### Calling AuthService
```tsx
const response = await authService.login({ email, password });

if (response.success) {
  navigation.navigate('Home');
} else {
  // Handle errors
  if (response.errors) {
    setEmailError(response.errors.email);
  }
  Alert.alert('Error', response.message);
}
```

### Adding Validation
```tsx
import { validateEmail } from '../utils/validators';

const validation = validateEmail(email);
if (!validation.isValid) {
  setEmailError(validation.error);
  return;
}
```

## 🔧 Configuration

### API Base URL
Update the base URL in `src/services/ApiClient.ts`:
```typescript
constructor(baseUrl: string = 'https://api.tracknextus.com') {
  this.baseUrl = baseUrl;
}
```

Or set it dynamically:
```typescript
apiClient.setBaseUrl('https://your-api.com');
```

## 📱 Navigation Flow

```
┌──────────┐     Sign Up     ┌───────────┐
│  Login   │ ──────────────> │  Signup   │
│  Screen  │                 │  Screen   │
└──────────┘                 └───────────┘
     │                             │
     │ Login Success               │ Register Success
     │                             │ (Navigate to Login)
     ▼                             ▼
┌──────────┐                 ┌──────────┐
│   Home   │ <────────────── │  Login   │
│  Screen  │                 │  Screen  │
└──────────┘                 └──────────┘
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 📦 Dependencies

### Core
- React Native 0.82.1
- React 19.1.1
- TypeScript 5.8.3

### Navigation
- @react-navigation/native ^7.1.25
- @react-navigation/native-stack ^7.8.6
- react-native-screens ^4.18.0

### UI
- react-native-safe-area-context ^5.6.2

## 🎨 Styling Guidelines

- Use `StyleSheet.create()` for all styles
- Follow Prettier config (single quotes, trailing commas)
- Keep colors and dimensions consistent across components
- Use safe area insets for proper device handling

## 🔐 Security Notes

- Passwords are sent securely (use HTTPS in production)
- Client-side validation for better UX
- Backend validation errors displayed cleanly
- Consider adding token storage with AsyncStorage in future sprints

## 🚧 Next Steps (Future Sprints)

- [ ] Token storage and persistence (AsyncStorage)
- [ ] Auto-login with stored tokens
- [ ] Password reset functionality
- [ ] Social authentication (Google, Apple)
- [ ] Profile management
- [ ] Logout functionality
- [ ] Context API for global auth state

## 📖 Documentation

See `.github/copilot-instructions.md` for comprehensive AI agent guidelines.

## 🤝 Contributing

When adding new features:
1. Follow Clean Architecture principles
2. Use functional components for UI
3. Use OOP classes for services
4. Add TypeScript types
5. Include validation
6. Update navigation if needed
7. Test on both iOS and Android

## 📄 License

Private project - All rights reserved
