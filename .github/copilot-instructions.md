# TrackNextUs - AI Coding Agent Instructions

## Project Overview
TrackNextUs is a React Native 0.82 mobile application built with TypeScript following Clean Architecture and OOP principles. The project uses React Navigation v6, functional components with hooks for UI, and class-based services for business logic. It targets both iOS and Android platforms with native Kotlin and Swift implementations.

## Architecture & Structure

### Clean Architecture Layers
```
src/
├── screens/          # UI Layer - Functional components with hooks
├── components/       # Reusable UI components
├── navigation/       # React Navigation configuration
├── services/         # Business Logic - OOP class-based services
├── utils/            # Helper functions and validators
└── types/            # TypeScript interfaces and types
```

### Component Structure
- **Entry point**: `index.js` registers the root component "TrackNextUs"
- **Root component**: `App.tsx` wraps the app with `SafeAreaProvider` and renders `AppNavigator`
- **Pattern**: Functional components with hooks for UI, class-based services for business logic
- **Navigation**: React Navigation v6 with native stack navigator
- **Safe area handling**: Uses `react-native-safe-area-context` throughout

### Sprint 1: Authentication Module
Current implementation includes:
- **Screens**: `LoginScreen`, `SignupScreen`, `HomeScreen`
- **Components**: `InputField`, `ButtonPrimary` (reusable, typed props)
- **Services**: `ApiClient` (singleton), `AuthService` (singleton)
- **Navigation**: `AuthStack` (Login → Signup → Home flow)
- **Validation**: Client-side validation with `validators.ts`

### Service Layer (OOP Pattern)
- **ApiClient** (`services/ApiClient.ts`):
  - Singleton class handling all HTTP requests
  - Methods: `get()`, `post()`, `put()`, `delete()`
  - Centralized error handling and response parsing
  - Export: `export const apiClient = new ApiClient();`

- **AuthService** (`services/AuthService.ts`):
  - Singleton class for authentication logic
  - Methods: `register()`, `login()`, `logout()`, `getCurrentUser()`
  - Uses `apiClient` internally
  - Export: `export const authService = new AuthService(apiClient);`

### Screen Component Pattern
```tsx
// Functional component with hooks
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async () => {
    // Validation
    const validation = validateEmail(email);
    if (!validation.isValid) {
      setEmailError(validation.error);
      return;
    }
    
    // Service call
    const response = await authService.login({ email, password });
    
    // Handle response with backend errors
    if (response.success) {
      navigation.navigate('Home');
    } else if (response.errors) {
      setEmailError(response.errors.email || '');
    }
  };
  
  return (
    <KeyboardAvoidingView>
      <InputField label="Email" value={email} onChangeText={setEmail} error={emailError} />
      <ButtonPrimary title="Login" onPress={handleLogin} loading={loading} />
    </KeyboardAvoidingView>
  );
};
```

### Native Layer
- **Android**: Kotlin-based with package `com.tracknextus`
  - `MainActivity.kt`: Extends `ReactActivity`, uses `DefaultReactActivityDelegate` with Fabric support
  - `MainApplication.kt`: Auto-linking via `PackageList(this).packages`
  - Add manual native modules to `PackageList` in `MainApplication.kt` if needed
- **iOS**: Swift-based with modern `RCTReactNativeFactory` pattern
  - `AppDelegate.swift`: Uses `ReactNativeDelegate` and `RCTAppDependencyProvider`
  - Bundle URL switches between dev (`jsBundleURL`) and production (`main.jsbundle`) based on DEBUG flag

## Development Workflows

### Initial Setup
```bash
npm install              # Install dependencies

# iOS only - first time or after native dependency changes
bundle install
bundle exec pod install
```

### Running the App
```bash
npm start                 # Start Metro bundler
npm run android          # Build and run Android
npm run ios              # Build and run iOS
```

### Testing & Quality
```bash
npm test                 # Run Jest tests
npm run lint             # Run ESLint
```

### Fast Refresh & Debugging
- Changes to `.tsx` files auto-reload via Fast Refresh
- Force reload: Double-tap `R` (Android) or `R` in simulator (iOS)
- Dev menu: `Ctrl+M` (Windows/Linux) or `Cmd+M` (macOS) on Android

## Code Conventions

### TypeScript
- **Config**: Extends `@react-native/typescript-config`
- **Include**: All `.ts` and `.tsx` files
- **Exclude**: `node_modules/` and `Pods/`
- Use explicit types for props and state; leverage type inference for simple cases
- Define screen props using `NativeStackScreenProps<AuthStackParamList, 'ScreenName'>`
- Create type definitions in `src/types/` for domain models

### Styling & Formatting
- **Prettier config** (`.prettierrc.js`):
  - Single quotes: `'string'`
  - Arrow function parens: avoid when possible `x => x`
  - Trailing commas: always in multiline
- **ESLint**: Extends `@react-native` config
- Use `StyleSheet.create()` for component styles at the bottom of each file

### Component Patterns
- **UI Components**: Functional with hooks, props interface, exported as default
- **Reusable Components**: Accept props like `label`, `value`, `onChangeText`, `error`, `loading`
- **Form Handling**: Local state with `useState`, validation before submission
- **Error Display**: Show field-level errors from validators and backend response errors

### Service Patterns
- **Class-based**: All services are ES6 classes exported as singletons
- **Async Methods**: Use `async/await` for all API calls
- **Error Handling**: Return structured responses with `success`, `data`, `message`, `errors`
- **Dependency Injection**: Pass dependencies via constructor (e.g., `AuthService(apiClient)`)

### Testing
- Uses `react-test-renderer` for component testing
- Wrap renders in `ReactTestRenderer.act()` (see `__tests__/App.test.tsx`)
- Test file naming: `*.test.tsx` in `__tests__/` directory

## Dependencies & Integration

### Key Dependencies
- **React 19.1.1** & **React Native 0.82.1**: Latest versions with concurrent features
- **React Navigation v6**: `@react-navigation/native`, `@react-navigation/native-stack`
- **react-native-screens**: Required peer dependency for native stack
- **react-native-safe-area-context**: Required for safe area handling

### Build Tools
- **Babel**: Uses `@react-native/babel-preset`
- **Metro**: Default config with potential for custom transformers
- **Jest**: Preset `react-native` for testing

### Native Build Systems
- **Android**: Gradle with React Native plugin, supports Hermes and new architecture (Fabric)
- **iOS**: CocoaPods managed via Bundler, supports new architecture

## Platform-Specific Notes

### Android
- Min SDK and target SDK defined in `android/app/build.gradle`
- Hermes enabled by default for performance
- New Architecture (Fabric) can be toggled via `fabricEnabled` flag

### iOS
- Minimum iOS version set in `Podfile` via `min_ios_version_supported`
- CocoaPods dependencies must be reinstalled after any native module changes
- Use `bundle exec pod install` (not direct `pod install`) to ensure Bundler version consistency
- After installing React Navigation, run `bundle exec pod install` in `ios/` directory

## Adding New Features

### New Screens
1. Create `.tsx` file in `src/screens/` with typed props from navigation
2. Use functional components with hooks (`useState`, `useEffect`)
3. Import and use reusable components (`InputField`, `ButtonPrimary`)
4. Add screen to navigation stack in `src/navigation/AuthStack.tsx`
5. Add screen name to `AuthStackParamList` type
6. Add corresponding test file in `__tests__/`

### New Reusable Components
1. Create `.tsx` file in `src/components/`
2. Define props interface with TypeScript
3. Use `StyleSheet.create()` for styling
4. Export as default: `export default ComponentName`
5. Keep components pure and stateless when possible

### New Services
1. Create class in `src/services/` following OOP pattern
2. Accept dependencies via constructor
3. Export singleton instance: `export const serviceName = new ServiceName(dependencies)`
4. Define return types in `src/types/`
5. Handle errors gracefully with structured responses

### New Navigation Stacks
1. Create stack file in `src/navigation/` (e.g., `MainStack.tsx`)
2. Define param list type: `export type StackNameParamList = { Screen1: undefined; }`
3. Create navigator with `createNativeStackNavigator<ParamList>()`
4. Import and nest in `AppNavigator.tsx`

### Validation
1. Add validation functions to `src/utils/validators.ts`
2. Return `ValidationResult` type: `{ isValid: boolean; error?: string }`
3. Call validators before form submission
4. Display errors using component's error prop

## Common Patterns to Avoid
- Don't use inline styles for static layouts - use `StyleSheet.create()`
- Avoid direct `pod install` - always use `bundle exec pod install`
- Don't mix class and functional components in UI layer - keep UI functional
- Don't put business logic in screens - use service classes
- Don't hardcode strings - consider i18n for future scalability
- Avoid nested navigation without planning - keep navigation hierarchy flat when possible

## Navigation Best Practices
- Use typed navigation: `NativeStackScreenProps<ParamList, 'ScreenName'>`
- Access navigation prop: `navigation.navigate('ScreenName')`
- Pass params in navigate: `navigation.navigate('Details', { id: 123 })`
- Use `headerShown: false` for custom headers or auth screens
- Set `headerBackVisible: false` for screens that shouldn't go back (like Home after login)

## Troubleshooting
- **Metro bundler issues**: Clear cache with `npm start -- --reset-cache`
- **Native build issues (iOS)**: Clean build folder and re-run `bundle exec pod install`
- **Native build issues (Android)**: `cd android && ./gradlew clean`
- **Type errors**: Ensure `node_modules` is up to date with `npm install`
- **Navigation errors**: Verify all screen names in ParamList match navigator screen names
- **Safe area issues**: Ensure SafeAreaProvider wraps entire app in App.tsx
