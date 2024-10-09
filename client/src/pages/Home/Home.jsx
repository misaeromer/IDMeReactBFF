/*
 * Copyright (c) 2024-Present, ID.Me, Inc. and/or its affiliates. All rights reserved.
 */

import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useIDMeAuth } from "../../context/IDMeContext";
import PrettyPrintJSON from "../../components/PrettyPrintJson/PrettyPrintJson";

const Home = () => {
  const { authState } = useIDMeAuth();

  return (
    <div className={styles.container}>
      <div className={styles.innerDiv}>
        <span className={styles.innerDivText}>
          {" "}
          Welcome to the ID.Me Sample Application!
        </span>
        {authState.user === null ? (
          <span className={styles.innerDivText}>
            Looks like you're not logged in, login to see the response from the
            ID.Me authorization server
          </span>
        ) : (
          <PrettyPrintJSON jsonObject={authState.user} />
        )}
      </div>
    </div>
  );
};
export default Home;
