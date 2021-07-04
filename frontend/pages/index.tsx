import React, { useEffect } from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div className={styles.container}>
      <Topbar />
      <TodosContainer />
    </div>
  );
}
