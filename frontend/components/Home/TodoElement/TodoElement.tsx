import React from "react";
import styles from "./TodoElement.module.css";

function TodoElement(props: any) {
  return (
    <div
      className={styles.container}
      style={{ background: props.data?.background }}
    >
      <h3>{props.data?.title}</h3>
      <div className={styles.content}>{props.data?.description}</div>
      <div className={styles.category}>{props.data?.category}</div>
      <div className={styles.info}>
        <label className={styles.createdat}>
          Created at {props.data?.created_at}
        </label>
        <label className={styles.lastedited}>
          Last edited {props.data?.modified_at}
        </label>
      </div>
    </div>
  );
}

export default TodoElement;
