/*
 * Copyright (c) 2024-Present, ID.Me, Inc. and/or its affiliates. All rights reserved.
 */

import React, { useEffect, useState } from "react";
//styles
import styles from "./Navbar.module.css";

//context
import { useIDMeAuth } from "../../context/IDMeContext";

const Navbar = () => {
  const { authState, idMeAuth } = useIDMeAuth();

  const handleLoginLogout = async () => {
    if (!authState.user) {
      await idMeAuth.login();
    } else {
      await idMeAuth.logout();
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.rowStack}>
        <span
          className={styles.header}
          sx={{
            width: "10vw",
            fontSize: "1.25rem",
          }}
        >
          ID.Me React + Express Sample
        </span>
        <div className={styles.button} onClick={handleLoginLogout}>
          {authState.user !== null ? "Logout" : "Login"}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
