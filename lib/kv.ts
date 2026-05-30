import { supabaseAdmin } from "@/lib/supabase";
import type { BrainRecord, SessionState } from "@/lib/types";

type SetOptions = {
  ex?: number;
};

type KvTable = "sessions" | "brains";

type SessionRow = {
  id: string;
  user_id?: string | null;
  business_type: SessionState["businessType"];
  business_name: string | null;
  messages: SessionState["messages"];
  questions_answered: number;
  extracted_data: SessionState["extractedData"];
  status: SessionState["status"];
  created_at: string;
  expires_at: string;
};

type BrainRow = {
  id: string;
  user_id?: string | null;
  business_name: string;
  business_type: BrainRecord["meta"]["businessType"];
  generated_at: string;
  session_duration: number;
  knowledge: BrainRecord["knowledge"];
  processes: BrainRecord["processes"];
  judgment: BrainRecord["judgment"];
  skills: BrainRecord["skills"];
  knowledge_md: string;
  processes_md: string;
  judgment_md: string;
  expires_at: string;
};

export async function kvGet<T>(key: string): Promise<T | null> {
  const [table, id] = parseKey(key);

  if (table === "sessions") {
    const { data, error } = await supabaseAdmin
      .from("sessions")
      .select("*")
      .eq("id", id)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return deserialize<T>("sessions", data as SessionRow);
  }

  const { data, error } = await supabaseAdmin
    .from("brains")
    .select("*")
    .eq("id", id)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return deserialize<T>("brains", data as BrainRow);
}

export async function kvSet<T>(key: string, value: T, options?: SetOptions): Promise<void> {
  const [table, id] = parseKey(key);
  const row = serialize(table, id, value, options?.ex);

  const { error } =
    table === "sessions"
      ? await supabaseAdmin.from("sessions").upsert(row as SessionRow, { onConflict: "id" })
      : await supabaseAdmin.from("brains").upsert(row as BrainRow, { onConflict: "id" });

  if (error?.message.includes("user_id")) {
    const fallbackRow = { ...(row as Record<string, unknown>) };
    delete fallbackRow.user_id;

    const retry =
      table === "sessions"
        ? await supabaseAdmin.from("sessions").upsert(fallbackRow, { onConflict: "id" })
        : await supabaseAdmin.from("brains").upsert(fallbackRow, { onConflict: "id" });

    if (retry.error) {
      throw new Error(`kvSet failed: ${retry.error.message}`);
    }

    return;
  }

  if (error) {
    throw new Error(`kvSet failed: ${error.message}`);
  }
}

function parseKey(key: string): [KvTable, string] {
  if (key.startsWith("session:")) {
    return ["sessions", key.slice(8)];
  }

  if (key.startsWith("brain:")) {
    return ["brains", key.slice(6)];
  }

  throw new Error(`Unknown KV key prefix: ${key}`);
}

function serialize(
  table: KvTable,
  id: string,
  value: unknown,
  ttlSeconds?: number
): SessionRow | BrainRow {
  const expiresAt = new Date(
    Date.now() + (ttlSeconds ?? (table === "sessions" ? 86400 : 2592000)) * 1000
  ).toISOString();

  if (table === "sessions") {
    const session = value as SessionState;

    return {
      id,
      user_id: session.userId ?? null,
      business_type: session.businessType,
      business_name: session.businessName ?? null,
      messages: session.messages,
      questions_answered: session.questionsAnswered,
      extracted_data: session.extractedData,
      status: session.status,
      created_at: session.createdAt,
      expires_at: expiresAt
    };
  }

  const brain = value as BrainRecord;

  return {
    id,
    user_id: brain.meta.userId ?? null,
    business_name: brain.meta.businessName,
    business_type: brain.meta.businessType,
    generated_at: brain.meta.generatedAt,
    session_duration: brain.meta.sessionDuration,
    knowledge: brain.knowledge,
    processes: brain.processes,
    judgment: brain.judgment,
    skills: brain.skills,
    knowledge_md: brain.markdown.knowledge_md,
    processes_md: brain.markdown.processes_md,
    judgment_md: brain.markdown.judgment_md,
    expires_at: expiresAt
  };
}

function deserialize<T>(table: KvTable, row: SessionRow | BrainRow): T {
  if (table === "sessions") {
    const sessionRow = row as SessionRow;

    return {
      id: sessionRow.id,
      userId: sessionRow.user_id ?? undefined,
      businessType: sessionRow.business_type,
      businessName: sessionRow.business_name ?? undefined,
      messages: sessionRow.messages,
      questionsAnswered: sessionRow.questions_answered,
      extractedData: sessionRow.extracted_data,
      status: sessionRow.status,
      createdAt: sessionRow.created_at
    } as T;
  }

  const brainRow = row as BrainRow;

  return {
      meta: {
        id: brainRow.id,
        userId: brainRow.user_id ?? undefined,
        businessName: brainRow.business_name,
      businessType: brainRow.business_type,
      generatedAt: brainRow.generated_at,
      sessionDuration: brainRow.session_duration
    },
    knowledge: brainRow.knowledge,
    processes: brainRow.processes,
    judgment: brainRow.judgment,
    skills: brainRow.skills,
    markdown: {
      knowledge_md: brainRow.knowledge_md,
      processes_md: brainRow.processes_md,
      judgment_md: brainRow.judgment_md
    }
  } as T;
}
