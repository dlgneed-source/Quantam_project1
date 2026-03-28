export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_BASE_URL;

export type AiGeneratePayload = {
  mode: "text" | "image";
  prompt: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
};

export async function generateAi(payload: AiGeneratePayload): Promise<{ result: string }> {
  const response = await fetch(`${API_BASE_URL}/api/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.detail || data?.error || "AI request failed");
  }

  return { result: data?.result || "" };
}
