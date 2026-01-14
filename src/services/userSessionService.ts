// src/services/userSessionService.ts
import { api } from './api';

export interface StartedSession {
  id: number;
  status: string;
  scheduledDate: string;
  targetDurationMin: number | null;
}

// POST /api/user-sessions/start
export async function startUserSession(
  userMissionSessionId: number,
): Promise<StartedSession> {
  const res = await api.post('/user-sessions/start', {
    userMissionSessionId,
  });
  return res.data.data as StartedSession;
}
