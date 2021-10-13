import { IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import React, { useState, useEffect } from "react";
import styles from "./TodoElement.module.css";
import { ExternalCommands } from "../../../pages/api/apollo-client";
import DeleteSelectedTodo from "../Dialogs/DeleteSelectedTodo/DeleteSelectedTodo";

function TodoElement(props: any) {
  const [expandTodo, setExpandTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const { hideAllTodos, changeHideAllTodos, changeDeleteSelectedTodo } =
    ExternalCommands.useContainer();

  useEffect(() => {
    if (hideAllTodos) {
      setExpandTodo(false);
      changeHideAllTodos(false);
    }
  }, [hideAllTodos]);

  const handleMinimizeTodo = () => {
    setExpandTodo(false);
  };

  const handleOnClick = () => {
    setExpandTodo(!expandTodo);
  };

  const handleDeleteTodo = () => {
    changeDeleteSelectedTodo(props.data?.title, props.data?.id);
  };

  const handleEditTodo = () => {
    setEditTodo(false);
    setExpandTodo(false);
  };

  return (
    <div
      className={`${styles.container} ${
        expandTodo ? styles.containerExpand : null
      }`}
      style={{ background: props.data?.background }}
    >
      <div className={styles.toppanel}>
        <IconButton
          aria-label="edit"
          size="small"
          onClick={() => {
            if (!expandTodo) setExpandTodo(true);
            else setExpandTodo(false);

            setEditTodo(!editTodo);
          }}
        >
          <EditRoundedIcon fontSize="default" />
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={handleDeleteTodo}>
          <DeleteRoundedIcon fontSize="default" />
        </IconButton>
      </div>
      {!editTodo ? (
        <>
          <h3 className={styles.title} onClick={handleOnClick}>
            {props.data?.title}
          </h3>
          <div className={styles.content} onClick={handleOnClick}>
            {props.data?.description}
          </div>
          <div className={styles.todoBottomDiv} onClick={handleOnClick} />
          <div
            className={`${styles.todoBottom} ${
              !expandTodo ? styles.todoFixed : null
            }`}
          >
            <div className={styles.category} onClick={handleOnClick}>
              CATEGORY XXXXXXX
            </div>
            <div className={styles.info} onClick={handleOnClick}>
              <label className={styles.createdat}>
                Created at {new Date(props.data?.createdAt).toLocaleString()}
              </label>
              {props.data?.createdAt !== props.data?.modifiedAt && (
                <label className={styles.lastedited}>
                  Last edited:{" "}
                  {new Date(props.data?.modifiedAt).toLocaleString()}
                </label>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.edittodo}>
          <input
            type="text"
            placeholder="Title"
            defaultValue={props.data?.title}
            className={styles.inputtitle}
          />
          <textarea className={styles.textareadescription}>
            {props.data?.description}
          </textarea>
          <div className={styles.category}>CATEGORY XXXXXXX</div>
          <div className={styles.info}>
            <label className={styles.createdat}>
              Created at {new Date(props.data?.createdAt).toLocaleString()}
            </label>
            {props.data?.createdAt !== props.data?.modifiedAt && (
              <label className={styles.lastedited}>
                Last edited: {new Date(props.data?.modifiedAt).toLocaleString()}
              </label>
            )}
          </div>
          <div className={styles.editbuttons}>
            <button
              className={`${styles.button} ${styles.btn1}`}
              onClick={handleEditTodo}
            >
              Ok
            </button>
            <button
              className={`${styles.button} ${styles.btn2}`}
              onClick={() => {
                if (expandTodo) setExpandTodo(false);
                setEditTodo(!editTodo);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoElement;
