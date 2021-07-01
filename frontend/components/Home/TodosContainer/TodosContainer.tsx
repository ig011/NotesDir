import React from "react";
import TodoElement from "../TodoElement/TodoElement";
import styles from "./TodosContainer.module.css";

function TodosContainer() {
  return (
    <div className={styles.container}>
      <TodoElement />
    </div>
  );
}

export default TodosContainer;
