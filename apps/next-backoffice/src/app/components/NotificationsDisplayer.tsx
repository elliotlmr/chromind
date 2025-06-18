"use client";

import { useNotificationStore } from "@/store/notifications";
import { useEffect } from "react";

export function NotificationsDisplayer() {
  const notifications = useNotificationStore((s) => s.notifications);
  const remove = useNotificationStore((s) => s.remove);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded shadow-md text-white ${
            n.type === "error"
              ? "bg-red-500"
              : n.type === "success"
                ? "bg-green-500"
                : "bg-blue-500"
          }`}
        >
          <div className="flex justify-between items-center gap-4">
            <span>{n.message}</span>
            <button onClick={() => remove(n.id)} className="text-sm font-bold">
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
