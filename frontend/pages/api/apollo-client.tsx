import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createContainer } from "unstated-next";
import { useState } from "react";

// Create state management
function userInfo() {
  let [username, setUsername] = useState("");
  let [id, setId] = useState("");
  let [isLogged, setIsLogged] = useState(false);
  let [isLoggedOut, setIsLoggedOut] = useState(false);
  let [isStaff, setIsStaff] = useState(false);
  let [profilePicture, setProfilePicture] = useState("");

  const changeUsername = (username: string) => {
    setUsername(username);
  };

  const changeId = (id: any) => {
    setId(id);
  };

  const changeIsLogged = (logged: boolean) => {
    setIsLogged(logged);
  };

  const changeIsLoggedOut = (loggedOut: boolean) => {
    setIsLoggedOut(loggedOut);
  };

  const changeIsStaff = (staff: boolean) => {
    setIsStaff(staff);
  };

  const changeProfilePicture = (picture: string) => {
    setProfilePicture(picture);
  };

  return {
    username,
    id,
    isLogged,
    isLoggedOut,
    isStaff,
    profilePicture,
    changeUsername,
    changeId,
    changeIsLogged,
    changeIsLoggedOut,
    changeIsStaff,
    changeProfilePicture,
  };
}

function externalCommands() {
  let [hideAllTodos, setHideAllTodos] = useState(false);
  let [deleteAllTodos, setDeleteAllTodos] = useState(false);
  let [deleteSelectedTodo, setDeleteSelectedTodo] = useState({
    title: "",
    id: -1,
  });

  const changeHideAllTodos = (hideState: boolean) => {
    setHideAllTodos(hideState);
  };

  const changeDeleteAllTodos = (deleteState: boolean) => {
    setDeleteAllTodos(deleteState);
  };

  const changeDeleteSelectedTodo = (todoTitle: string, todoIndex: number) => {
    setDeleteSelectedTodo({
      ...deleteSelectedTodo,
      title: todoTitle,
      id: todoIndex,
    });
  };

  return {
    hideAllTodos,
    deleteAllTodos,
    deleteSelectedTodo,
    changeHideAllTodos,
    changeDeleteAllTodos,
    changeDeleteSelectedTodo,
  };
}

export let UserInfo = createContainer(userInfo);
export let ExternalCommands = createContainer(externalCommands);

// Create React Apollo Client - GraphQL
export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      username: $username
      email: $email
      password1: $password1
      password2: $password2
    ) {
      success
      errors
    }
  }
`;

export const VERIFY_USER = gql`
  mutation verifyUser($token: String!) {
    verifyAccount(token: $token) {
      success
    }
  }
`;

export const LOGIN_USER = gql`
  mutation logInUser($username: String!, $password: String!) {
    logInUser(username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logOutUser {
    logOutUser {
      deleted
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
      lastLogin
      isStaff
      userinformationSet {
        profilePicture
      }
    }
  }
`;

export const QUERY_GET_TODOS = gql`
  query allTodos {
    allTodos {
      id
      title
      description
      createdAt
      modifiedAt
    }
  }
`;

export const MUTATION_ADD_TODO = gql`
  mutation addTodo(
    $backgroundColor: String
    $description: String!
    $endDate: DateTime!
    $startDate: DateTime
    $thumbnail: String
    $title: String!
    $userId: ID!
  ) {
    addTodo(
      backgroundColor: $backgroundColor
      description: $description
      endDate: $endDate
      startDate: $startDate
      thumbnail: $thumbnail
      title: $title
      userId: $userId
    ) {
      todoCreated
    }
  }
`;

export const MUTATION_DELETE_TODO = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      todoDeleted
    }
  }
`;

export default client;
