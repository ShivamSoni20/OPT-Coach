type SetOptions = {
  ex?: number;
};

type MemoryEntry = {
  expiresAt?: number;
  value: unknown;
};

declare global {
  // eslint-disable-next-line no-var
  var __optCoachMemoryKv: Map<string, MemoryEntry> | undefined;
}

const memoryStore = globalThis.__optCoachMemoryKv ?? new Map<string, MemoryEntry>();

if (!globalThis.__optCoachMemoryKv) {
  globalThis.__optCoachMemoryKv = memoryStore;
}

async function resolveRemoteKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }

  try {
    const module = await import("@vercel/kv");
    return module.kv;
  } catch {
    return null;
  }
}

function getMemoryValue<T>(key: string) {
  const item = memoryStore.get(key);

  if (!item) {
    return null;
  }

  if (item.expiresAt && item.expiresAt < Date.now()) {
    memoryStore.delete(key);
    return null;
  }

  return item.value as T;
}

export async function kvGet<T>(key: string) {
  const remoteKv = await resolveRemoteKv();

  if (remoteKv) {
    return (await remoteKv.get<T>(key)) ?? null;
  }

  return getMemoryValue<T>(key);
}

export async function kvSet<T>(key: string, value: T, options?: SetOptions) {
  const remoteKv = await resolveRemoteKv();

  if (remoteKv) {
    if (typeof options?.ex === "number") {
      await remoteKv.set(key, value, { ex: options.ex });
    } else {
      await remoteKv.set(key, value);
    }
    return;
  }

  memoryStore.set(key, {
    value,
    expiresAt: options?.ex ? Date.now() + options.ex * 1000 : undefined
  });
}
