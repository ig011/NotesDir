import React, { useState } from "react";
import AddTodo from "../Dialogs/AddTodo/AddTodo";
import styles from "./Topbar.module.css";
import { ExternalCommands } from "../../../pages/api/apollo-client";
import DeleteAllTodos from "../Dialogs/DeleteAllTodos/DeleteAllTodos";
import DeleteSelectedTodo from "../Dialogs/DeleteSelectedTodo/DeleteSelectedTodo";

function Topbar() {
  const [showDialogAddTodo, setShowDialogAddTodo] = useState(false);
  const [showDialogDeleteAllTodos, setShowDialogDeleteAllTodos] =
    useState(false);
  const { deleteSelectedTodo, changeHideAllTodos, changeDeleteSelectedTodo } =
    ExternalCommands.useContainer();

  const handleShowDialogAddTodo = () => {
    if (!showDialogAddTodo) setShowDialogAddTodo(true);
  };

  const handleShowDialogDeleteAllTodos = () => {
    if (!showDialogDeleteAllTodos) setShowDialogDeleteAllTodos(true);
  };

  const handleHideAllTodos = () => {
    changeHideAllTodos(true);
  };

  const handleDeleteAllTodos = () => {};

  return (
    <div className={styles.container}>
      {showDialogAddTodo && (
        <AddTodo setShowDialogAddTodo={setShowDialogAddTodo} />
      )}
      {showDialogDeleteAllTodos && (
        <DeleteAllTodos
          setShowDialogDeleteAllTodos={setShowDialogDeleteAllTodos}
        />
      )}
      {deleteSelectedTodo.id >= 0 && <DeleteSelectedTodo />}
      <button
        className={`${styles.btn} ${styles.btn1}`}
        onClick={handleShowDialogAddTodo}
      >
        Add todo
      </button>
      <button className={`${styles.btn}`}>Refresh</button>
      <button className={`${styles.btn}`} onClick={handleHideAllTodos}>
        Hide all
      </button>
      <button
        className={`${styles.btn}`}
        onClick={handleShowDialogDeleteAllTodos}
      >
        Delete all
      </button>
    </div>
  );
}

export default Topbar;
