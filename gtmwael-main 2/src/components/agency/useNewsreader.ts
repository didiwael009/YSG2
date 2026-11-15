import { useEffect } from "react";

const HREF = "https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Newsreader:ital,wght@1,500&display=swap";

/** Loads Inter 800 and Newsreader italic on /agency only; index.html stays unchanged. */
export function useNewsreader(): void {
  useEffect(() => {
    if (document.head.querySelector("link[data-agency-font]")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HREF;
    link.setAttribute("data-agency-font", "");
    document.head.appendChild(link);
  }, []);
}
