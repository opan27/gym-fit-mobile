// src/services/missionService.ts
import { api } from './api';

export type MissionGoalType =
  | 'lose_fat'
  | 'gain_muscle'
  | 'general_health'
  | string;

export interface RecommendedUserInfo {
  id: number;
  goal: MissionGoalType | null;
  activityLevel: 'low' | 'moderate' | 'high' | null;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  weightKg: number | null;
  heightCm: number | null;
  bmi: number | null;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese' | null;
}

export interface RecommendedMission {
  id: number;
  title: string;
  description: string;
  goalType: MissionGoalType;
  sessionsPerWeek: number | null;
  durationDays?: number | null;
  createdAt: string;
}

export interface RecommendedMissionResponse {
  user: RecommendedUserInfo;
  missions: RecommendedMission[];
}

// ==== DETAIL MISSION (SUMMARY) ====

export interface MissionExercise {
  id: number;
  exerciseId: number;
  name: string;
  targetSets: number | null;
  targetReps: number | null;
}

export interface MissionSession {
  id: number;
  dayIndex: number;
  title: string;
  description: string | null;
  targetDurationMin: number | null;
  exercises: MissionExercise[];
}

export interface MissionDetailSummary {
  id: number;
  title: string;
  description: string;
  goalType: MissionGoalType;
  durationDays: number | null;
  sessionsPerWeek: number | null;
  sessions: MissionSession[];
}

// GET /api/missions/recommended
export async function fetchRecommendedMissions(): Promise<RecommendedMissionResponse> {
  const res = await api.get('/missions/recommended');
  return res.data.data as RecommendedMissionResponse;
}

// GET /api/missions/:missionId/detail
export async function fetchMissionDetail(
  missionId: number,
): Promise<MissionDetailSummary> {
  const res = await api.get(`/missions/${missionId}/detail`);
  return res.data.data as MissionDetailSummary;
}

// POST /api/missions/:missionId/assign
export interface AssignMissionResult {
  mission: MissionDetailSummary;
  userMission: {
    id: number;
    status: string;
    startedAt: string;
    completedAt: string | null;
  };
}

export async function assignMission(missionId: number): Promise<AssignMissionResult> {
  const res = await api.post(`/missions/${missionId}/assign`, null);
  return res.data.data as AssignMissionResult;
}
