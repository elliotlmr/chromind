import { useNotificationStore } from "@/store/notifications";

export const fetchAPI = async (endpoint: string, options?: RequestInit) => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    credentials: "include",
    ...options,
  });

  if (!response.ok && response.status === 401) {
    useNotificationStore.getState().push({
      message: "Vous devez être connecté pour accéder à cette page.",
      type: "error",
    });
    window.location.href = "/auth/sign-in";
  }

  return response;
};