/**
 * AppNavigator - Root navigation component
 * Wraps NavigationContainer and loads AuthStack
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
