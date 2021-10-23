import { IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import React, { useState, useEffect } from "react";
import styles from "./TodoElement.module.css";
import {
  ExternalCommands,
  MUTATION_UPDATE_TODO,
} from "../../../pages/api/apollo-client";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GithubPicker } from "react-color";
import { AnyObject } from "yup/lib/types";

const schema = yup.object().shape({
  title: yup.string().required("Title cannot be blank."),
  content: yup.string().required("Content cannot be blank."),
});

function TodoElement(props: any) {
  const [expandTodo, setExpandTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [updateTodo] = useMutation(MUTATION_UPDATE_TODO);
  const [propsData, setPropsData] = useState({
    title: props.data?.title,
    content: props.data?.description,
    background: props.data?.backgroundColor,
  });
  const { hideAllTodos, changeHideAllTodos, changeDeleteSelectedTodo } =
    ExternalCommands.useContainer();

  useEffect(() => {
    if (hideAllTodos) {
      setExpandTodo(false);
      changeHideAllTodos(false);
    }
  }, [hideAllTodos]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleMinimizeTodo = () => {
    setExpandTodo(false);
  };

  const handleChangeBackgroundColor = (color: any) => {
    setPropsData({ ...propsData, background: color.hex });
  };

  const handleOnClick = () => {
    setExpandTodo(!expandTodo);
  };

  const handleDeleteTodo = () => {
    changeDeleteSelectedTodo(props.data?.title, props.data?.id);
  };

  const handleEditTodo = async (data: any) => {
    setEditTodo(false);
    setExpandTodo(false);

    let dateTime = new Date();

    await updateTodo({
      variables: {
        title: data.title,
        description: data.content,
        backgroundColor: propsData.background,
        todoId: props.data?.id,
        endDate: dateTime.toISOString(),
      },
    })
      .then(() => {
        setPropsData({
          ...propsData,
          title: props.data?.title,
          content: props.data?.description,
        });
      })
      .catch(() => {});
  };

  return (
    <div
      className={`${styles.container} ${
        expandTodo ? styles.containerExpand : null
      }`}
    >
      <div
        className={styles.toppanel}
        style={{ backgroundColor: propsData.background }}
      >
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
          <div>
            <h3 className={styles.title} onClick={handleOnClick}>
              {props.data?.title}
            </h3>
          </div>
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
              {props.data?.category ? "CATEGORY XXXXXXX" : null}
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
        <div>
          <form
            className={styles.edittodo}
            onSubmit={handleSubmit(handleEditTodo)}
          >
            <input
              type="text"
              placeholder="Title"
              defaultValue={props.data?.title}
              className={styles.inputtitle}
              {...register("title")}
            />
            <textarea
              className={styles.textareadescription}
              {...register("content")}
            >
              {props.data?.description}
            </textarea>
            <div className={styles.category}>CATEGORY XXXXXXX</div>
            <div className={styles.info}>
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
            <div className={styles.editbuttons}>
              <button
                className={`${styles.button} ${styles.btn1}`}
                type="submit"
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
              <div className={styles.colorPicker}>
                <GithubPicker
                  color={propsData.background}
                  onChange={handleChangeBackgroundColor}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default TodoElement;
