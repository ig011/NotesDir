import React, { useEffect, useRef } from "react";
import styles from "./AddTodo.module.css";

function AddTodo(props: any) {
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setShowAddTodo(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className={styles.container}>
      <div className={styles.dialogcontainer} ref={wrapperRef}>
        <div className={styles.dialogtitle}>Add todo</div>
        <div className={styles.dialog}>
          <div className={styles.dialogelement}>
            <label>Title</label>
            <input
              className={styles.inputtitle}
              type="text"
              placeholder="Enter new todo title"
            />
          </div>
          <div className={styles.dialogelement}>
            <label>Content</label>
            <textarea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
