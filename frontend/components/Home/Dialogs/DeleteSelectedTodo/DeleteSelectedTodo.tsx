import { useMutation } from "@apollo/client";
import React from "react";
import client, {
  ExternalCommands,
  MUTATION_DELETE_TODO,
} from "../../../../pages/api/apollo-client";
import styles from "./DeleteSelectedTodo.module.css";

function DeleteSelectedTodo(props: any) {
  const { deleteSelectedTodo, changeDeleteSelectedTodo } =
    ExternalCommands.useContainer();
  const [deleteTodo] = useMutation(MUTATION_DELETE_TODO);

  const handleOnClickNo = () => {
    changeDeleteSelectedTodo("", -1);
  };

  const handleOnClickYes = async () => {
    // Detele Selected Todo handler
    await deleteTodo({ variables: { todoId: deleteSelectedTodo.id } })
      .then((response) => {
        changeDeleteSelectedTodo("", -1);
      })
      .catch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <label className={styles.label1}>
          Are you sure to delete selected todo {deleteSelectedTodo.title}?
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

export default DeleteSelectedTodo;
