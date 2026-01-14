// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { useAuth } from '../../src/hooks/useAuth';

export default function TabsLayout() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#FFB000',
                tabBarInactiveTintColor: '#9CA3AF',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="mission"
                options={{
                    title: 'Mission Saya',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flag-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Riwayat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
