/*
 * Copyright (c) 2024-Present, ID.Me, Inc. and/or its affiliates. All rights reserved.
 */

import React from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Routes from "./components/Routes/Routes";

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <main>
        <Routes />
      </main>
    </div>
  );
};
export default App;
