import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import TreadmillImage from '../../../assets/images/treadmill.jpg';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store';
import { clearAuthError, clearRegisterMessage, registerThunk } from '../../store/authSlice';
import { styles } from './styles';

export const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, registerMessage } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak sama');
      return;
    }
    dispatch(registerThunk({ name, email, password }));
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Register gagal', String(error), [
        { text: 'OK', onPress: () => dispatch(clearAuthError()) },
      ]);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (registerMessage) {
      Alert.alert('Registrasi Berhasil', registerMessage, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearRegisterMessage());
            router.replace('/verify-otp');
          },
        },
      ]);
    }
  }, [registerMessage, dispatch, router]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={TreadmillImage} style={styles.illustration} />

      <Text style={styles.title}>Sign Up</Text>

      <Input placeholder="Full Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Email Address"
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
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator color="#000" style={{ marginVertical: 10 }} />
      ) : (
        <Button title="Create Account" onPress={onRegister} />
      )}

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
