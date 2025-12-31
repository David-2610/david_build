"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";

export function useAdminAuth() {
  const router = useRouter();
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const exp = localStorage.getItem("admin_token_exp");

    if (!token || !exp) {
      adminLogout();
      return;
    }

    const expiry = Number(exp);

    const tick = () => {
      const timeLeft = expiry - Date.now();

      if (timeLeft <= 0) {
        adminLogout();
      } else {
        setRemaining(timeLeft);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return remaining;
}
