import React, { useEffect } from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";
import { useRouter } from "next/router";
import { UserInfo } from "./api/apollo-client";
import { useContainer } from "unstated-next";
import { client, GET_CURRENT_USER } from "./api/apollo-client";

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

export async function getStaticProps(context: any) {
  const userData = (await client.query({ query: GET_CURRENT_USER })).data;
  console.log(userData);

  return {
    props: {},
  };
}
