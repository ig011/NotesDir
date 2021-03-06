import { useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { MUTATION_ADD_TODO } from "../../../../pages/api/apollo-client";
import styles from "./AddTodo.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("Title cannot be blank."),
  content: yup.string().required("Content cannot be blank."),
});

function AddTodo(props: any) {
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setShowDialogAddTodo(false);
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

  const handleClickCancel = () => {
    props.setShowDialogAddTodo(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addTodo] = useMutation(MUTATION_ADD_TODO);
  const handleClickAdd = async (data: any) => {
    let dateTime = new Date();
    await addTodo({
      variables: {
        title: data.title,
        description: data.content,
        endDate: dateTime.toISOString(),
      },
    })
      .then((response) => {
        props.setShowDialogAddTodo(false);
      })
      .catch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialogcontainer} ref={wrapperRef}>
        <div className={styles.dialogtitle}>Add todo</div>
        <form className={styles.dialog} onSubmit={handleSubmit(handleClickAdd)}>
          <div className={styles.dialogelement}>
            <label>Title</label>
            <input
              className={styles.inputtitle}
              type="text"
              placeholder="Enter todo title"
              {...register("title")}
            />
          </div>
          {errors?.title && (
            <p className={styles.errors}>{errors.title.message}</p>
          )}
          <div className={styles.dialogelement}>
            <label>Content</label>
            <textarea className={styles.areatext} {...register("content")} />
          </div>
          {errors?.content && (
            <p className={styles.errors}>{errors.content.message}</p>
          )}
          <div className={styles.dialogelement}>
            <div className={styles.buttons}>
              <button className={`${styles.btn} ${styles.btnAdd}`}>Add</button>
              <button
                className={`${styles.btn} ${styles.btnCancel}`}
                onClick={handleClickCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
