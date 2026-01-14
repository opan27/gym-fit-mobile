import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store';
import { clearAuthError, clearVerifyMessage, verifyOtpThunk } from '../../store/authSlice';
import { styles } from './styles';

export const VerifyOtpScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, verifyMessage, tempEmail } = useAuth();

  const [otp, setOtp] = useState('');

  const onSubmit = () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Masukkan kode OTP 6 digit');
      return;
    }
    if (!tempEmail) {
      Alert.alert('Error', 'Email tidak ditemukan. Silakan register ulang.');
      return;
    }
    dispatch(verifyOtpThunk({ email: tempEmail, otp }));
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Verifikasi gagal', String(error), [
        { text: 'OK', onPress: () => dispatch(clearAuthError()) },
      ]);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (verifyMessage) {
      Alert.alert('Berhasil', verifyMessage, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearVerifyMessage());
            router.replace('/login');
          },
        },
      ]);
    }
  }, [verifyMessage, dispatch, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifikasi Email</Text>
      <Text style={styles.subtitle}>
        Masukkan kode OTP 6 digit yang dikirim ke email kamu.
      </Text>

      <Input
        placeholder="Kode OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 12 }} />
      ) : (
        <Button title="Verifikasi" onPress={onSubmit} />
      )}

      <TouchableOpacity onPress={() => Alert.alert('Info', 'Fitur kirim ulang OTP belum dibuat')}>
        <Text style={styles.linkText}>Tidak menerima kode? Kirim ulang</Text>
      </TouchableOpacity>
    </View>
  );
};
