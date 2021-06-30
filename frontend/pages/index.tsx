import React from "react";
import Topbar from "../components/Home/Top-bar/Topbar";
import TodosContainer from "../components/Home/TodosContainer/TodosContainer";
import styles from "../styles/home/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Topbar />
      <TodosContainer />
    </div>
  );
}
