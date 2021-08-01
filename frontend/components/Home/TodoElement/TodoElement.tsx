import { IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import React, { useState } from "react";
import styles from "./TodoElement.module.css";

function TodoElement(props: any) {
  const [expandTodo, setExpandTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);

  const handleOnClick = () => {
    setExpandTodo(!expandTodo);
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
          aria-label="delete"
          size="small"
          onClick={() => setEditTodo(!editTodo)}
        >
          <EditRoundedIcon fontSize="small" />
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
                  Last edited{" "}
                  {new Date(props.data?.modifiedAt).toLocaleString()}
                </label>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default TodoElement;
