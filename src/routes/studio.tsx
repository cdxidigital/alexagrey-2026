import { useEffect, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { StudioDashboard } from "@/components/studio-dashboard";
import { checkInboxAccess } from "@/lib/bookings";

export const Route = createFileRoute("/studio")({ component: StudioPage });

function StudioPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    void checkInboxAccess()
      .then(({ authorized: permitted }) => {
        if (active) setAuthorized(permitted);
      })
      .catch(() => {
        if (active) setAuthorized(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (authorized === null) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink text-gold-light">
        <p className="label-text">Checking secure studio access…</p>
      </main>
    );
  }
  if (!authorized) return <Navigate to="/login" />;
  return <StudioDashboard />;
}
