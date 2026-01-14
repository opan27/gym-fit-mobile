// app/mission/detail.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../src/constants/colors';
// TYPE mission datang dari missionService (detail rekomendasi)
import {
  MissionDetailSummary,
  MissionSession,
} from '../../src/services/missionService';

// chooseMission datang dari userMissionService
import { chooseMission } from '../../src/services/userMissionService';
export default function MissionDetailScreen() {
  const params = useLocalSearchParams<{ mission: string }>();
  const mission = JSON.parse(params.mission) as MissionDetailSummary;

  const [assigning, setAssigning] = useState(false);
  const router = useRouter();

  const handleChooseMission = async () => {
    try {
      setAssigning(true);
      const result = await chooseMission(mission.id);
      console.log('Chosen mission:', result);
      router.push('/(tabs)/mission');
    } catch (e: any) {
      console.log('Failed to choose mission', e?.response?.data || e.message);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* CONTENT SCROLLABLE */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 96, // kasih space buat area tombol fixed
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ILUSTRASI ATAS */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 65,   // ini yang nurunin gambar dari status bar
            paddingBottom: 8,
          }}
        >
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=800',
            }}
            style={{
              width: '100%',
              height: 210,
              borderRadius: 18,
            }}
            resizeMode="cover"
          />
        </View>

        {/* INFO & DESKRIPSI */}
        <View style={{ paddingHorizontal: 16, paddingTop: 4 }}>
          <Text
            style={{
              fontSize: 11,
              color: '#6B7280',
              marginBottom: 4,
            }}
          >
            Beginner
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: COLORS.text,
              marginBottom: 6,
            }}
          >
            {mission.title}
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#6B7280',
              marginBottom: 10,
            }}
          >
            Aktivitas ringan: jalan kaki, stretching, hidrasi
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#9CA3AF',
              marginBottom: 4,
            }}
          >
            Goal: {mission.goalType}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#9CA3AF',
              marginBottom: 4,
            }}
          >
            Durasi: {mission.durationDays || '?'} hari
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#9CA3AF',
              marginBottom: 16,
            }}
          >
            {mission.sessionsPerWeek || '?'}x / minggu
          </Text>
        </View>

        {/* LIST SESSIONS */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: 10,
            }}
          >
            Sessions
          </Text>

          {mission.sessions.map((s: MissionSession) => (
            <View
              key={s.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                paddingVertical: 12,
                paddingHorizontal: 14,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: COLORS.text,
                }}
              >
                {s.title}
              </Text>
              {s.description && (
                <Text
                  style={{
                    fontSize: 12,
                    color: '#6B7280',
                    marginTop: 4,
                  }}
                >
                  {s.description}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* TOMBOL PILIH MISSION - FIXED DI BAWAH */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 20,
          backgroundColor: COLORS.background,
        }}
      >
        <TouchableOpacity
          onPress={handleChooseMission}
          disabled={assigning}
          style={{
            backgroundColor: COLORS.primary,
            paddingVertical: 14,
            borderRadius: 999,
            alignItems: 'center',
          }}
        >
          {assigning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 15,
              }}
            >
              Pilih mission
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
