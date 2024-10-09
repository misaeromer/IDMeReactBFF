import React from "react";
import styles from "./PrettyPrintJSON.module.css";

const PrettyPrintJSON = ({ jsonObject }) => {
  return (
    <div className={styles.prettyPrintContainer}>
      <span className={styles.prettyPrintJson}>
        {JSON.stringify(jsonObject, null, 2)}
      </span>
    </div>
  );
};

export default PrettyPrintJSON;
