import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../src/constants/colors';
import {
  ActiveMissionProgress,
  getActiveMissionProgress,
  getActiveMissionSessions,
  UserMissionSession,
} from '../../src/services/userMissionService';

export default function MissionScreen() {
  const [progress, setProgress] = useState<ActiveMissionProgress | null>(null);
  const [sessions, setSessions] = useState<UserMissionSession[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loadData = async () => {
    try {
      setLoading(true);
      const [p, s] = await Promise.all([
        getActiveMissionProgress(),
        getActiveMissionSessions(),
      ]);
      setProgress(p);
      setSessions(s);
    } catch (e: any) {
      console.log(
        'Failed to load mission data',
        e?.response?.data || e.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!progress) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 32,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: COLORS.text,
            marginBottom: 6,
          }}
        >
          Belum ada mission aktif
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: '#6B7280',
            textAlign: 'center',
          }}
        >
          Pilih mission dulu dari halaman Home untuk mulai jadwal latihanmu.
        </Text>
      </View>
    );
  }

  const percent = progress.stats.progressPercent;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* BANNER MISSION AKTIF */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: COLORS.text,
            marginBottom: 12,
          }}
        >
          Mission Saya
        </Text>

        <View
          style={{
            backgroundColor: '#FFF4DE',
            borderRadius: 18,
            padding: 14,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: '#6B7280',
              marginBottom: 4,
            }}
          >
            Active mission
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: COLORS.text,
              marginBottom: 6,
            }}
          >
            {progress.mission.title}
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: '#6B7280',
              marginBottom: 8,
            }}
          >
            {progress.mission.sessionsPerWeek}x / minggu •{' '}
            {progress.mission.durationDays} hari
          </Text>

          <View
            style={{
              height: 6,
              borderRadius: 999,
              backgroundColor: '#F3F4F6',
              overflow: 'hidden',
              marginBottom: 4,
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${percent}%`,
                backgroundColor: COLORS.primary,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#9CA3AF',
            }}
          >
            Progress {percent}% • {progress.stats.completedSessions}/
            {progress.stats.totalSessions} sesi • Streak{' '}
            {progress.stats.streakDays} hari
          </Text>
        </View>
      </View>

      {/* LIST SESSION MISSION AKTIF */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: 10,
              marginTop: 12,
            }}
          >
            Sessions
          </Text>
        }
        renderItem={({ item }) => {
          const date = new Date(item.scheduledDate);
          const dateLabel = date.toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          });

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: '/mission/session-detail',
                  params: { userMissionSessionId: String(item.id) },
                })
              }
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: '#9CA3AF',
                  marginBottom: 4,
                }}
              >
                {dateLabel} • {item.status}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: COLORS.text,
                  marginBottom: 4,
                }}
              >
                {item.missionSession.title}
              </Text>

              {item.missionSession.description && (
                <Text
                  style={{
                    fontSize: 12,
                    color: '#6B7280',
                  }}
                >
                  {item.missionSession.description}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
