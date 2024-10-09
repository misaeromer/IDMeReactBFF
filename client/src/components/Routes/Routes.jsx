/*
 * Copyright (c) 2024-Present, ID.Me, Inc. and/or its affiliates. All rights reserved.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact={true} element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
