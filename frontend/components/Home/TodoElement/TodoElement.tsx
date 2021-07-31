import React, { useState } from "react";
import styles from "./TodoElement.module.css";

function TodoElement(props: any) {
  const [expandTodo, setExpandTodo] = useState(false);

  const handleOnClick = () => {
    setExpandTodo(!expandTodo);
  };

  return (
    <div
      className={`${styles.container} ${
        expandTodo ? styles.containerExpand : null
      }`}
      style={{ background: props.data?.background }}
      onClick={handleOnClick}
    >
      <h3 className={styles.title}>{props.data?.title}</h3>
      <div className={styles.content}>{props.data?.description}</div>
      <div className={styles.todoBottomDiv} />
      <div
        className={`${styles.todoBottom} ${
          !expandTodo ? styles.todoFixed : null
        }`}
      >
        <div className={styles.category}>CATEGORY XXXXXXX</div>
        <div className={styles.info}>
          <label className={styles.createdat}>
            Created at {new Date(props.data?.createdAt).toLocaleString()}
          </label>
          {props.data?.createdAt !== props.data?.modifiedAt && (
            <label className={styles.lastedited}>
              Last edited {new Date(props.data?.modifiedAt).toLocaleString()}
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoElement;
