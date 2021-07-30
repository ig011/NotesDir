import React, { useEffect } from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";
import { useRouter } from "next/router";
import { GET_CURRENT_USER, UserInfo, client } from "./api/apollo-client";
import { useContainer } from "unstated-next";
import { isNonNullType } from "graphql";

export default function Home() {
  const { isLogged, changeIsLogged, changeUsername } = useContainer(UserInfo);
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      await client
        .query({ query: GET_CURRENT_USER })
        .then((response) => {
          console.log(response.data);
          if (response.data?.me === null) {
            router.push({ pathname: "signin" });
          }
        })
        .catch();
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {isLogged ? (
        <div className={styles.container}>
          <Topbar />
          <TodosContainer />
        </div>
      ) : null}
    </>
  );
}
