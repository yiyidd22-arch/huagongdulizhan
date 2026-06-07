import { getNewsApiBase } from "./news-api";

export interface ConsultationFormData {
  name: string;
  email: string;
  company?: string;
  product?: string;
  message: string;
}

interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export async function submitConsultation(
  data: ConsultationFormData,
): Promise<{ success: boolean; message: string }> {
  const apiBase = getNewsApiBase();
  try {
    const res = await fetch(`${apiBase}/consultations/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json: ApiResponse<{ id: string }> = await res.json();
    if (res.ok && json.code === 0) {
      return { success: true, message: json.msg || "提交成功" };
    }
    return { success: false, message: json.msg || "提交失败，请稍后重试" };
  } catch {
    return { success: false, message: "网络错误，请稍后重试" };
  }
}
