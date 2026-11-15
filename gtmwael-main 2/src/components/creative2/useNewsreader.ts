import { useEffect } from "react";

const HREF = "https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Newsreader:ital,wght@1,500&display=swap";

/** Loads Newsreader italic on /creative-2 only; index.html stays unchanged. */
export function useNewsreader(): void {
  useEffect(() => {
    if (document.head.querySelector("link[data-creative2-font]")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HREF;
    link.setAttribute("data-creative2-font", "");
    document.head.appendChild(link);
  }, []);
}
