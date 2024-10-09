/*
 * Copyright (c) 2024-Present, ID.Me, Inc. and/or its affiliates. All rights reserved.
 */

import React from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./polyfills";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { IDMeProvider } from "./context/IDMeContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <IDMeProvider>
      <App />
    </IDMeProvider>
  </BrowserRouter>
);
registerServiceWorker();
