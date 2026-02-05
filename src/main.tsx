import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(<App />);

requestAnimationFrame(() => {
  root.classList.remove("critical-hidden");
  root.classList.add("critical-visible");
});