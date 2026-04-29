import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";

export const render = (path: string) =>
  renderToString(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );
