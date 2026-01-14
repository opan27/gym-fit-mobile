// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { AppProviders } from '../src/AppProviders';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        {/* root → redirect ke (tabs) */}
        <Stack.Screen name="index" />

        {/* auth & onboarding */}
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="verify-otp" />
        <Stack.Screen name="complete-profile" />

        {/* group tabs */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProviders>
  );
}
