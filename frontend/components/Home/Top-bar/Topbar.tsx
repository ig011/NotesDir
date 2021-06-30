import React from "react";
import styles from "./Topbar.module.css";

function Topbar() {
  return (
    <div className={styles.container}>
      <label>Active todos: {2}</label>
      <button>add todo</button>
      <button>filter</button>
      <label>Done todos: {3}</label>
      <label>Archived todos: {10}</label>
    </div>
  );
}

export default Topbar;
