import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_GET_TODOS } from "../../../pages/api/apollo-client";
import TodoElement from "../TodoElement/TodoElement";
import styles from "./TodosContainer.module.css";

function TodosContainer() {
  const { loading, data } = useQuery(QUERY_GET_TODOS, { pollInterval: 1000 });

  return (
    <div className={styles.container}>
      {!loading
        ? data.allTodos.map((todo: any) => (
            <TodoElement data={todo} key={todo.id} />
          ))
        : null}
    </div>
  );
}

export default TodosContainer;
