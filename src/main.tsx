import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Light-mode only: palettes are applied pre-boot by the script in index.html,
// so React just renders on top of whatever palette is already active.
createRoot(document.getElementById("root")!).render(<App />);
