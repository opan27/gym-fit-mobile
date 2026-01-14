// src/services/userMissionService.ts
import { api } from './api';

export interface MissionSessionCore {
  id: number;
  missionId: number;
  dayIndex: number;
  title: string;
  description: string | null;
  targetDurationMin: number | null;
  // kalau nanti backend kirim exercises, bisa ditambah di sini
}

export type UserMissionSessionStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed';

export interface UserMissionSession {
  id: number;
  userMissionId: number;
  missionSessionId: number;
  scheduledDate: string; // ISO string
  status: UserMissionSessionStatus;
  adherenceScore: number | null;
  difficultyRating: number | null;
  missionSession: MissionSessionCore;
}

export interface ChooseMissionResponse {
  mission: {
    id: number;
    title: string;
    durationDays: number;
    sessionsPerWeek: number;
  };
  userMission: {
    id: number;
    startDate: string;
    endDate: string;
    status: string;
  };
}

export interface ActiveMissionProgress {
  mission: {
    id: number;
    title: string;
    durationDays: number;
    sessionsPerWeek: number;
  };
  userMission: {
    id: number;
    startDate: string;
    endDate: string;
    status: string;
  };
  stats: {
    totalSessions: number;
    completedSessions: number;
    progressPercent: number;
    daysFromStart: number;
    streakDays: number;
  };
}

// ============ API CALLS ============

// POST /api/user-missions  → pilih/assign mission ke user
export async function chooseMission(
  missionId: number,
): Promise<ChooseMissionResponse> {
  const res = await api.post('/user-missions', { missionId });
  // backend: { message, data: { mission, userMission } }
  return res.data.data as ChooseMissionResponse;
}

// GET /api/user-missions/active/sessions
// → ambil semua sesi untuk mission aktif user
export async function getActiveMissionSessions(): Promise<UserMissionSession[]> {
  const res = await api.get('/user-missions/active/sessions');
  // backend: { message, data: [ ... ] }
  return res.data.data as UserMissionSession[];
}

export async function getActiveMissionProgress(): Promise<ActiveMissionProgress | null> {
  const res = await api.get('/user-missions/active/progress');
  return res.data.data as ActiveMissionProgress | null;
}