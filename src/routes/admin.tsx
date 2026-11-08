import { useEffect, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { StudioInbox } from "@/components/studio-inbox";
import { checkInboxAccess } from "@/lib/bookings";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    void checkInboxAccess()
      .then(({ authorized: ok }) => {
        if (active) setAuthorized(ok);
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
      <main className="grid min-h-screen place-items-center bg-ink px-6 text-cream">
        <p className="label-text text-gold">Checking secure studio access…</p>
      </main>
    );
  }

  if (!authorized) return <Navigate to="/login" />;

  return <StudioInbox />;
}
