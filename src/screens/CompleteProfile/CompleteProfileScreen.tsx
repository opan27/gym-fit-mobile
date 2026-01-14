// src/screens/CompleteProfile/CompleteProfileScreen.tsx
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { meService } from '../../services/meService';
import { useAppDispatch } from '../../store';
import { fetchMeThunk } from '../../store/authSlice';
import { styles } from './styles';

export const CompleteProfileScreen = () => {
  const { profile } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [gender, setGender] = useState<string>(profile?.gender || '');
  const [goal, setGoal] = useState<string>(profile?.goal || '');

  const [activityLevel, setActivityLevel] = useState<string>(
    profile?.activityLevel || '',
  );
  const [experienceLevel, setExperienceLevel] = useState<string>(
    profile?.experienceLevel || '',
  );

  const initialDate = profile?.birthDate
    ? new Date(profile.birthDate)
    : new Date(2000, 0, 1);

  const [birthDate, setBirthDate] = useState<Date>(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [heightCm, setHeightCm] = useState(
    profile?.heightCm?.toString() || '',
  );
  const [weightKg, setWeightKg] = useState(
    profile?.weightKg?.toString() || '',
  );
  const [saving, setSaving] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    if (date) {
      setShowDatePicker(false);
      setBirthDate(date);
    }
  };

  const formattedBirthDate = birthDate.toISOString().substring(0, 10);

  const onSave = async () => {
    if (
      !gender ||
      !goal ||
      !activityLevel ||
      !experienceLevel ||
      !heightCm ||
      !weightKg ||
      !birthDate
    ) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    try {
      setSaving(true);
      await meService.updateProfile({
        gender,
        goal,
        activityLevel,
        experienceLevel,
        birthDate: formattedBirthDate,
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
      });

      await dispatch(fetchMeThunk());
      Alert.alert('Berhasil', 'Profil berhasil diperbarui', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } catch (e: any) {
      Alert.alert(
        'Error',
        e?.response?.data?.message || 'Gagal menyimpan profil',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lengkapi Profil</Text>
      <Text style={styles.subtitle}>
        Isi data dasar kamu dulu supaya rekomendasi latihan lebih akurat.
      </Text>

      {/* Gender */}
      <Text style={styles.sectionTitle}>Gender</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(String(value))}
        >
          <Picker.Item label="Pilih gender" value="" />
          <Picker.Item label="Laki-laki" value="male" />
          <Picker.Item label="Perempuan" value="female" />
          <Picker.Item label="Lainnya" value="other" />
        </Picker>
      </View>

      {/* Birth date */}
      <Text style={styles.sectionTitle}>Tanggal Lahir</Text>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Input
          editable={false}
          pointerEvents="none"
          value={formattedBirthDate}
          placeholder="YYYY-MM-DD"
        />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      {/* Fisik */}
      <Text style={styles.sectionTitle}>Fisik</Text>
      <Input
        placeholder="Tinggi badan (cm)"
        value={heightCm}
        onChangeText={setHeightCm}
        keyboardType="numeric"
      />
      <Input
        placeholder="Berat badan (kg)"
        value={weightKg}
        onChangeText={setWeightKg}
        keyboardType="numeric"
      />

      {/* Goal */}
      <Text style={styles.sectionTitle}>Goal Latihan</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={goal}
          onValueChange={(value) => setGoal(String(value))}
        >
          <Picker.Item label="Pilih goal" value="" />
          <Picker.Item label="Turun berat badan" value="lose_fat" />
          <Picker.Item label="Naik massa otot" value="gain_muscle" />
          <Picker.Item label="Sehat umum / maintain" value="general_health" />
        </Picker>
      </View>

      {/* Activity level */}
      <Text style={styles.sectionTitle}>Level Aktivitas</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={activityLevel}
          onValueChange={(value) => setActivityLevel(String(value))}
        >
          <Picker.Item label="Pilih level aktivitas" value="" />
          <Picker.Item label="Rendah (jarang olahraga)" value="low" />
          <Picker.Item
            label="Sedang (3-4x/minggu)"
            value="moderate"
          />
          <Picker.Item label="Tinggi (4-6x/minggu)" value="high" />
        </Picker>
      </View>

      {/* Experience level */}
      <Text style={styles.sectionTitle}>Pengalaman Latihan</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={experienceLevel}
          onValueChange={(value) => setExperienceLevel(String(value))}
        >
          <Picker.Item label="Pilih level" value="" />
          <Picker.Item label="Pemula" value="beginner" />
          <Picker.Item label="Menengah" value="intermediate" />
          <Picker.Item label="Lanjutan" value="advanced" />
        </Picker>
      </View>

      {saving ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : (
        <Button title="Simpan Profil" onPress={onSave} />
      )}
    </ScrollView>
  );
};
