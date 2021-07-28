import React, { useEffect } from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";
import { useRouter } from "next/router";
import { UserInfo } from "./api/apollo-client";
import { useContainer } from "unstated-next";

export default function Home() {
  const { isLogged, username, changeIsLogged, changeUsername } =
    useContainer(UserInfo);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push({
        pathname: "/signin",
      });
    }
  }, [isLogged]);

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
