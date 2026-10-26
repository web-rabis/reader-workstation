// Универсальный save/load для ЛЮБОГО типа T.
// Делает мягкий (shallow) merge поверх defaultValue, чтобы новые поля не терялись.
export const KEY_SEARCH   = "dashboard:search";
export const KEY_PAGING   = "dashboard:paging";
export function loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return clone(defaultValue);
        const parsed = JSON.parse(raw);
        // если оба — объекты, делаем мягкий мердж; иначе берём сохранённое как есть
        if (isPlainObject(defaultValue) && isPlainObject(parsed)) {
            return { ...(defaultValue as any), ...(parsed as any) } as T;
        }
        return parsed as T;
    } catch {
        return clone(defaultValue);
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { /* ignore */ }
}

export function clearStorageKeys(keys: string[]): void {
    for (const k of keys) {
        try { localStorage.removeItem(k); } catch {}
    }
}

// helpers
function isPlainObject(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null && Object.getPrototypeOf(v) === Object.prototype;
}
function clone<T>(v: T): T {
    try { return JSON.parse(JSON.stringify(v)); } catch { return v; }
}
