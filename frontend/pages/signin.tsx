import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/signup/Signup.module.css";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "./api/apollo-client";

const schema = yup.object().shape({
  username: yup.string().required("Username field cannot be blank"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password field is required."),
});

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.textdiv}>
          <div className={styles.title}>Register your account today!</div>
          <div className={styles.description}>
            In order to use <strong>NotesDir</strong> Web application you need
            to create an account first!
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3>Log in</h3>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors?.username && (
            <p className={styles.errors}>{errors.username.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password && (
            <p className={styles.errors}>{errors.password.message}</p>
          )}
          <button className={styles.btn1} type="submit">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
