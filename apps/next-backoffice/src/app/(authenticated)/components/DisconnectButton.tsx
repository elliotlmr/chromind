"use client";

import { fetchAPI } from "@/utils/fetchAPI";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notifications";

const DisconnectButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await fetchAPI("/auth/sign-out", {
      method: "POST",
    });

    if (res.ok) {
      useNotificationStore.getState().push({
        message: "Vous avez été déconnecté.",
        type: "success",
      });
      router.push("/auth/sign-in");
    } else {
      useNotificationStore.getState().push({
        message: "Erreur lors de la déconnexion",
        type: "error",
      });
    }
  };

  return (
    <button className="btn btn-error mt-auto" onClick={handleSignOut}>
      Se déconnecter
    </button>
  );
};

export default DisconnectButton;
