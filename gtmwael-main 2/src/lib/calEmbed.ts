/* eslint-disable @typescript-eslint/no-explicit-any */
// Cal.com's standard embed loader: queues calls on window.Cal and injects embed.js once.
const EMBED_SRC = "https://app.cal.com/embed/embed.js";

type CalApi = (...args: unknown[]) => void;

export function getCal(namespace: string): CalApi {
  const w = window as any;
  if (!w.Cal) {
    const push = (api: any, args: unknown) => api.q.push(args);
    const cal: any = function (...args: any[]) {
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const s = document.createElement("script");
        s.src = EMBED_SRC;
        s.async = true;
        document.head.appendChild(s);
        cal.loaded = true;
      }
      if (args[0] === "init") {
        const ns = args[1];
        if (typeof ns === "string") {
          const api: any = function (...a: unknown[]) {
            push(api, a);
          };
          api.q = [];
          cal.ns[ns] = cal.ns[ns] || api;
          push(cal.ns[ns], args);
          push(cal, ["initNamespace", ns]);
          return;
        }
      }
      push(cal, args);
    };
    cal.q = [];
    w.Cal = cal;
  }
  if (!w.Cal.ns?.[namespace]) w.Cal("init", namespace, { origin: "https://app.cal.com" });
  return w.Cal.ns[namespace];
}
