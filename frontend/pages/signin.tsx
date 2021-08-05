import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/signup/Signup.module.css";
import { useMutation } from "@apollo/client";
import client, {
  UserInfo,
  LOGIN_USER,
  GET_CURRENT_USER,
} from "./api/apollo-client";
import { useRouter } from "next/router";
import Link from "next/link";

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

  const {
    isLogged,
    isLoggedOut,
    changeIsLogged,
    changeUsername,
    changeIsLoggedOut,
    changeProfilePicture,
    changeIsStaff,
  } = UserInfo.useContainer();

  const [logInUser] = useMutation(LOGIN_USER);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    await logInUser({
      variables: { username: data.username, password: data.password },
    })
      .then((response) => {
        if (response.data?.logInUser.payload.username) {
          setVerifyAccount(false);
          changeIsLogged(true);
          changeIsLoggedOut(false);
          changeUsername(response.data?.logInUser.payload.username);
        }
      })
      .catch((err) => {
        console.log(err);
        setInvalidCredentials(true);
      });
    await client
      .query({ query: GET_CURRENT_USER })
      .then((response) => {
        console.log(response);
        if (response.data?.me) {
          changeIsStaff(response.data.me.isStaff);
          changeProfilePicture(
            response.data.me.userinformationSet[0].profilePicture
          );
          setInvalidCredentials(false);
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isLogged) router.push("/");
    return () => {
      changeIsLoggedOut(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.textdiv}>
          <div className={styles.title}>JOIN US AND START USING NotesDir!</div>
          <div className={styles.description}>
            This website has been created in order to help people in managing
            their own tasks. You can add new todo thing, set the time and all
            the design stuff.
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {isLoggedOut && (
          <div className={styles.usercreated}>
            You have been succesfully logged out!
          </div>
        )}
        {invalidCredentials && (
          <div className={styles.verifyaccount}>
            Invalid username or password.
          </div>
        )}
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
          <label className={styles.hasaccount}>
            Don't you have an account?{" "}
            <Link href="/signup">
              <strong>Register!</strong>
            </Link>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Signin;
