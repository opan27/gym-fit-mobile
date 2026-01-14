// src/screens/Login/LoginScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store';
import {
    clearAuthError,
    fetchMeThunk,
    loginThunk,
} from '../../store/authSlice';
import { styles } from './styles';

import TreadmillImage from '../../../assets/images/treadmill.jpg';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isLoggedIn, isProfileComplete, profileLoaded } =
    useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }
    dispatch(loginThunk({ email, password }));
  };

  // Setelah dapat token, ambil /me untuk cek isProfileComplete
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMeThunk());
    }
  }, [isLoggedIn, dispatch]);

  // Setelah profil ke-load, tentukan mau ke tabs atau lengkapi profil
  useEffect(() => {
    if (!isLoggedIn || !profileLoaded) return;

    if (isProfileComplete) {
      router.replace('/(tabs)');
    } else {
      router.replace('/complete-profile');
    }
  }, [isLoggedIn, profileLoaded, isProfileComplete, router]);

  // Handle error login
  useEffect(() => {
    if (error) {
      Alert.alert('Login gagal', String(error), [
        { text: 'OK', onPress: () => dispatch(clearAuthError()) },
      ]);
    }
  }, [error, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={TreadmillImage} style={styles.illustration} />

      <Text style={styles.title}>Login</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator color="#000" style={{ marginVertical: 10 }} />
      ) : (
        <Button title="Log In" onPress={onLogin} />
      )}

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};
