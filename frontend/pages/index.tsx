import React, { useEffect } from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";
import { useRouter } from "next/router";
import { GET_CURRENT_USER, UserInfo, client } from "./api/apollo-client";

export default function Home(props: any) {
  const { isLogged, changeIsLogged, changeUsername } = UserInfo.useContainer();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) router.push("/signin");
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
