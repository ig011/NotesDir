import React from "react";
import styles from "./DeleteAllTodos.module.css";

function DeleteAllTodos(props: any) {
  const handleOnClickNo = () => {
    props.setShowDialogDeleteAllTodos(false);
  };

  const handleOnClickYes = () => {
    // Detele All Todos handler
    props.setShowDialogDeleteAllTodos(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <label className={styles.label1}>
          Are you sure to delete all todos?
        </label>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.btn2}`}
            onClick={handleOnClickYes}
          >
            Yes
          </button>
          <button
            className={`${styles.btn} ${styles.btn1}`}
            onClick={handleOnClickNo}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAllTodos;
