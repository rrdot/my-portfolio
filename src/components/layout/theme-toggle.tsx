"use client";
import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
type Theme = "system" | "light" | "dark";
const subscribe = (callback: () => void) => {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
};
const getTheme = (): Theme => {
  const theme = document.documentElement.dataset.theme;
  return theme === "light" || theme === "dark" ? theme : "system";
};
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "system" as Theme,
  );
  const next =
    theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  const Icon = theme === "system" ? Monitor : theme === "light" ? Sun : Moon;
  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  }
  return (
    <button
      className="icon-button"
      onClick={toggle}
      aria-label={`Theme: ${theme}. Switch to ${next}`}
      title={`Theme: ${theme}. Switch to ${next}`}
    >
      <Icon size={18} />
    </button>
  );
}
