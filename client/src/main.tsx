import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom styles for the font family
const style = document.createElement('style');
style.innerHTML = `
  :root {
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'Fira Code', monospace;
  }
  
  body {
    font-family: var(--font-sans);
    scroll-behavior: smooth;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
