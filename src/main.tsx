import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadImage } from "./utils/imageOptimization";

// Preload critical images for better performance
const criticalImages = [
  '/src/assets/profile-nobg.png',
  '/placeholder.svg'
];

criticalImages.forEach(src => {
  preloadImage(src).catch(() => {
    // Silently fail if image doesn't exist
  });
});

createRoot(document.getElementById("root")!).render(<App />);
