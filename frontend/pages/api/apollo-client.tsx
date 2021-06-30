import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $password2: String!
  ) {
    register(
      username: $username
      email: $email
      password1: $password
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

export default client;