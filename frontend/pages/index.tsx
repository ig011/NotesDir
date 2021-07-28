import React from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";
import { useRouter } from "next/router";
import { UserInfo } from "./api/apollo-client";
import { useContainer } from "unstated-next";

export default function Home() {
  const { isLogged, changeIsLogged, changeUsername } = useContainer(UserInfo);
  const router = useRouter();

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
