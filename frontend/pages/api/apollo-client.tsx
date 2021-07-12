import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createContainer } from "unstated-next";
import { useState } from "react";

// Create state management
function userInfo() {
  let [username, setUsername] = useState("");
  let [id, setId] = useState("");
  let [isLogged, setIsLogged] = useState(false);

  const changeUsername = (username: string) => {
    setUsername(username);
  };

  const changeId = (id: any) => {
    setId(id);
  };

  const changeIsLogged = (logged: boolean) => {
    setIsLogged(logged);
  };

  return { username, id, isLogged, changeUsername, changeId, changeIsLogged };
}

export let UserInfo = createContainer(userInfo);

// Create React Apollo Client - GraphQL
const client = new ApolloClient({
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
      errors
    }
  }
`;

export const LOGIN_USER = gql`
  mutation logInUser($username: String, $password: String!) {
    logInUser(username: $username, password: $password) {
      token
      refreshToken
      success
      errors
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      id
      username
      lastLogin
    }
  }
`;

export const QUERY_GET_TODOS = gql`
  query {
    allTodos($userId: ID!, $order: String) {
      allTodos(userId: $userId, order: $order) {
        id
        title
        description
      }
    }
  }
`;

export default client;
