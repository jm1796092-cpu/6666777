export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else {
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes > 0 ? `${minutes}分钟前` : '刚刚';
  }
}

export function getCurrentDate(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function saveToLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Failed to parse ${key}:`, e);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}