"use client";

import dynamic from "next/dynamic";

const DeckContainer = dynamic(
  () => import("@/components/deck/DeckContainer"),
  { ssr: false }
);

export default function Home() {
  return <DeckContainer />;
}
