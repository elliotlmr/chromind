"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/utils/fetchAPI";
import { useNotificationStore } from "@/store/notifications";

export default function SignInForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        email: (e.target as HTMLFormElement).email.value,
        password: (e.target as HTMLFormElement).password.value,
      };

      const response = await fetchAPI("/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      useNotificationStore.getState().push({
        message: "Connexion réussie",
        type: "success",
      });
      // Redirect to the dashboard
      router.push("/");
      router.refresh();
    } catch (err) {
      useNotificationStore.getState().push({
        message: "Erreur lors de la connexion",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
      <Link href="/auth/sign-up" className="btn btn-link">
        No account yet? Sign up.
      </Link>
    </form>
  );
}
