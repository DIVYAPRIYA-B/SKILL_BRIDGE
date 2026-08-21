const PREFIX = 'skillbridge_';
const memoryStore: Record<string, string> = {};

const isAvailable = (() => {
  try {
    const k = '__test__';
    localStorage.setItem(k, k);
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
})();

export const storage = {
  get<T>(key: string, fallback: T): T {
    const fullKey = PREFIX + key;
    try {
      const raw = isAvailable ? localStorage.getItem(fullKey) : memoryStore[fullKey];
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    const fullKey = PREFIX + key;
    const raw = JSON.stringify(value);
    if (isAvailable) {
      try { localStorage.setItem(fullKey, raw); } catch { memoryStore[fullKey] = raw; }
    } else {
      memoryStore[fullKey] = raw;
    }
  },
  remove(key: string): void {
    const fullKey = PREFIX + key;
    if (isAvailable) localStorage.removeItem(fullKey);
    else delete memoryStore[fullKey];
  },
  isAvailable,
};
