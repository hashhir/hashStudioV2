"use client";

import { useCallback, useState } from "react";

import { ChatAssistant } from "@/components/chat-assistant";
import { EntryLoader } from "@/components/entry-loader";

export function SiteShell() {
  const [ready, setReady] = useState(false);
  const handleLoaderComplete = useCallback(() => setReady(true), []);

  return (
    <>
      <EntryLoader onComplete={handleLoaderComplete} />
      {ready ? <ChatAssistant /> : null}
    </>
  );
}
