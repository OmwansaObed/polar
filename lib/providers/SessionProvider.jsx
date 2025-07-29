"use client";
import { SessionProvider } from "next-auth/react";
import useSyncUser from "@/hooks/useSyncUser";

function SyncUserWrapper() {
  useSyncUser();
  return null;
}

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
      <SyncUserWrapper />
    </SessionProvider>
  );
}
