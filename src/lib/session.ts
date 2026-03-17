// 会话管理（使用 localStorage）

import type { Session, Step } from '@/types';

const SESSION_STORAGE_KEY = 'ai_drama_sessions';
const CURRENT_SESSION_KEY = 'ai_drama_current_session';

// 生成新会话
export function createSession(startStep: Step): Session {
  const sessionId = Date.now().toString() + Math.random().toString(36).substring(7);
  const session: Session = {
    sessionId,
    currentStep: startStep,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  saveSession(session);
  setCurrentSession(sessionId);
  return session;
}

// 保存会话
export function saveSession(session: Session): void {
  const sessions = getAllSessions();
  const index = sessions.findIndex(s => s.sessionId === session.sessionId);

  if (index >= 0) {
    sessions[index] = { ...session, updatedAt: new Date() };
  } else {
    sessions.push(session);
  }

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
}

// 获取所有会话
export function getAllSessions(): Session[] {
  const data = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!data) return [];

  try {
    const sessions = JSON.parse(data);
    return sessions.map((s: any) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
    }));
  } catch {
    return [];
  }
}

// 获取单个会话
export function getSession(sessionId: string): Session | null {
  const sessions = getAllSessions();
  return sessions.find(s => s.sessionId === sessionId) || null;
}

// 设置当前会话
export function setCurrentSession(sessionId: string): void {
  localStorage.setItem(CURRENT_SESSION_KEY, sessionId);
}

// 获取当前会话
export function getCurrentSession(): Session | null {
  const sessionId = localStorage.getItem(CURRENT_SESSION_KEY);
  if (!sessionId) return null;
  return getSession(sessionId);
}

// 更新当前会话
export function updateCurrentSession(updates: Partial<Session>): Session | null {
  const session = getCurrentSession();
  if (!session) return null;

  const updated = { ...session, ...updates, updatedAt: new Date() };
  saveSession(updated);
  return updated;
}

// 删除会话
export function deleteSession(sessionId: string): void {
  const sessions = getAllSessions();
  const filtered = sessions.filter(s => s.sessionId !== sessionId);
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(filtered));

  const current = localStorage.getItem(CURRENT_SESSION_KEY);
  if (current === sessionId) {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  }
}
