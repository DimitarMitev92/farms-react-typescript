import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { GlobalReset } from "./styles/GlobalCSSReset.styled.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalReset />
    <App />
  </React.StrictMode>
);
