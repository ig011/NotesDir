import React, { useState } from "react";
import AddTodo from "../Dialogs/AddTodo/AddTodo";
import styles from "./Topbar.module.css";

function Topbar() {
  const [showAddTodo, setShowAddTodo] = useState(false);

  const handleAddTodo = () => {
    setShowAddTodo(true);
  };

  return (
    <div className={styles.container}>
      {showAddTodo && <AddTodo setShowAddTodo={setShowAddTodo} />}
      <label className={styles.label1}>My Todo's</label>
      <button
        className={`${styles.btn} ${styles.btn1}`}
        onClick={handleAddTodo}
      >
        Add todo
      </button>
      <button className={`${styles.btn}`}>Refresh</button>
    </div>
  );
}

export default Topbar;
