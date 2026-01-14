import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS } from '../../src/constants/colors';
import {
    UserMissionSession,
    getActiveMissionSessions,
} from '../../src/services/userMissionService';
import { startUserSession } from '../../src/services/userSessionService';

export default function SessionDetailScreen() {
  const { userMissionSessionId } = useLocalSearchParams<{
    userMissionSessionId: string;
  }>();
  const router = useRouter();

  const [session, setSession] = useState<UserMissionSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const [moodAfter, setMoodAfter] = useState<
    'very_bad' | 'bad' | 'neutral' | 'good' | 'very_good' | null
  >(null);

  const loadSession = async () => {
    try {
      setLoading(true);
      const list = await getActiveMissionSessions();
      const found = list.find(
        (s) => s.id === Number(userMissionSessionId),
      );
      setSession(found || null);
    } catch (e: any) {
      console.log(
        'Failed to load session detail',
        e?.response?.data || e.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMissionSessionId]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const handleStart = async () => {
    if (!session) return;
    try {
      setStarting(true);
      await startUserSession(session.id);
      setIsRunning(true);
    } catch (e: any) {
      console.log(
        'Failed to start session',
        e?.response?.data || e.message,
      );
    } finally {
      setStarting(false);
    }
  };

  const handleFinish = async () => {
    if (!session) return;
    try {
      setSaving(true);
      setIsRunning(false);

      const actualMinutes = Math.round(elapsedSec / 60);

      // TODO: buat wrapper logSession di userSessionService, ini versi langsung:
      const res = await fetch(
        `http://10.101.15.47:4000/api/user-sessions/${session.id}/log`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            actualDurationMinutes: actualMinutes,
            perceivedIntensity: 'medium',
            caloriesEstimated: null,
            moodBefore: null,
            moodAfter: moodAfter || 'neutral',
            note: null,
            proofPhotoUrl: null,
            exercises: [],
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.log('Failed log response:', data);
      }

      router.back();
    } catch (e: any) {
      console.log('Failed to log session', e?.response?.data || e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !session) {
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

  const target = session.missionSession.targetDurationMin || 0;
  const mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
  const ss = String(elapsedSec % 60).padStart(2, '0');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          color: COLORS.text,
          marginBottom: 6,
        }}
      >
        {session.missionSession.title}
      </Text>

      {session.missionSession.description && (
        <Text
          style={{
            fontSize: 13,
            color: '#6B7280',
            marginBottom: 10,
          }}
        >
          {session.missionSession.description}
        </Text>
      )}

      <Text
        style={{
          fontSize: 13,
          color: '#9CA3AF',
          marginBottom: 16,
        }}
      >
        Target: {target} menit
      </Text>

      <View
        style={{
          alignItems: 'center',
          marginBottom: 20,
          paddingVertical: 16,
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: COLORS.text,
            marginBottom: 8,
          }}
        >
          {mm}:{ss}
        </Text>

        <TouchableOpacity
          onPress={isRunning ? () => setIsRunning(false) : handleStart}
          disabled={starting}
          style={{
            backgroundColor: COLORS.primary,
            paddingVertical: 10,
            paddingHorizontal: 24,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {isRunning ? 'Pause' : starting ? 'Loading...' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 13,
            color: COLORS.text,
            marginBottom: 8,
          }}
        >
          Mood setelah sesi:
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[
            { key: 'very_bad', label: '😣' },
            { key: 'bad', label: '🙁' },
            { key: 'neutral', label: '😐' },
            { key: 'good', label: '🙂' },
            { key: 'very_good', label: '😄' },
          ].map((m) => (
            <TouchableOpacity
              key={m.key}
              onPress={() =>
                setMoodAfter(m.key as typeof moodAfter)
              }
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  moodAfter === m.key ? '#FFE0A8' : '#FFFFFF',
              }}
            >
              <Text style={{ fontSize: 22 }}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleFinish}
        disabled={saving}
        style={{
          backgroundColor: '#10B981',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
        }}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 15,
            }}
          >
            Selesaikan sesi
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
