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
      <h3 className={styles.title}>THIS IS THE TITLE OF XXXXXXXXXXXXXX</h3>
      <div className={styles.content}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      <div className={styles.todoBottomDiv} />
      <div
        className={`${styles.todoBottom} ${
          !expandTodo ? styles.todoFixed : null
        }`}
      >
        <div className={styles.category}>CATEGORY XXXXXXX</div>
        <div className={styles.info}>
          <label className={styles.createdat}>
            Created at XXXXXXXXXX{props.data?.created_at}
          </label>
          <label className={styles.lastedited}>
            Last edited XXXXXXXXX{props.data?.modified_at}
          </label>
        </div>
      </div>
    </div>
  );
}

export default TodoElement;
