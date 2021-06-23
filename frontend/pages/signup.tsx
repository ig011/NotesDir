import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/signup/Signup.module.css";

const schema = yup.object().shape({
  username: yup.string().required("Username field cannot be blank"),
  email: yup.string().required("Email field is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password field is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  isAccepted: yup
    .bool()
    .required()
    .isFalse("You have to accept the requiremenets"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => console.log(data);

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
          <input type="text" placeholder="Username" {...register("username")} />
          {errors?.username && (
            <p className={styles.errors}>{errors.username.message}</p>
          )}
          <input type="text" placeholder="Email" {...register("email")} />
          {errors?.email && (
            <p className={styles.errors}>{errors.email.message}</p>
          )}{" "}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password && (
            <p className={styles.errors}>{errors.password.message}</p>
          )}{" "}
          {errors?.password2 && (
            <p className={styles.errors}>{errors.password2.message}</p>
          )}
          <input
            type="password"
            placeholder="Re-type password"
            {...register("password2")}
          />
          <div className={styles.cb}>
            <input
              type="checkbox"
              className={styles.checkbox}
              {...register("isAccepted")}
            />
            <label>I've understand requirements</label>
          </div>
          {errors?.isAccepted && (
            <p className={styles.errors}>{errors.isAccepted.message}</p>
          )}
          <button className={styles.btn1} type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
