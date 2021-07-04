import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/signup/Signup.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER, GET_CURRENT_USER } from "./api/apollo-client";

const schema = yup.object().shape({
  username: yup.string().required("Username field cannot be blank."),
  password: yup.string().required("Password field is required."),
});

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [logInUser] = useMutation(LOGIN_USER);
  const currentUser = useQuery(GET_CURRENT_USER, { pollInterval: 1000 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [verifyAccount, setVerifyAccount] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    await logInUser({
      variables: { username: data.username, password: data.password },
    })
      .then((response) => {
        if (
          response.data?.logInUser.errors?.nonFieldErrors[0].code.includes(
            "not"
          )
        )
          setVerifyAccount(true);
        else {
          setVerifyAccount(false);
        }
        setIsValid(response?.data.logInUser.success);
        if (isValid) console.log(response.data?.logInUser);
      })
      .catch((error) => console.log(error));
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.textdiv}>
          <div className={styles.title}>
            JOIN US AND START USING NotesDir! {currentUser.data.username}
          </div>
          <div className={styles.description}>
            This website has been created in order to help people in managing
            their own tasks. You can add new todo thing, set the time and all
            the design stuff.
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {verifyAccount && (
          <div className={styles.verifyaccount}>
            You have to verify your account first. Check your e-mail.
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3>Log in</h3>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors?.username && (
            <p className={styles.errors}>{errors.username.message}</p>
          )}
          {!isValid && !errors?.username && (
            <p className={styles.errors}>Wrong username - may do not exist.</p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password && (
            <p className={styles.errors}>{errors.password.message}</p>
          )}
          {!isValid && !errors?.password && (
            <p className={styles.errors}>Wrong password.</p>
          )}
          <button className={styles.btn1} type="submit" disabled={isSubmitting}>
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
