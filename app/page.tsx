"use client";

import { ParticipantsTable } from "./components/ParticipantsTable";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PrimeReactProvider>
        <ParticipantsTable />
      </PrimeReactProvider>
    </main>
  );
}
