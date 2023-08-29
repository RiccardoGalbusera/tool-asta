"use client";

import { ParticipantsTable } from "./components/ParticipantsTable";
import { PlayerSelection } from "./components/PlayerSelection";
import { PrimeReactProvider } from "primereact/api";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { App } from "./components/App";

export default function Home() {
  return (
    <main>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </main>
  );
}
