import React, { useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./AccountMenu.module.css";
import {
  client,
  LOGOUT_USER,
  UserInfo,
} from "../../../pages/api/apollo-client";
import { useContainer } from "unstated-next";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

function AccountMenu(props: any) {
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setShowAccountMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const { isLogged, username, changeIsLogged, changeUsername } =
    useContainer(UserInfo);

  const router = useRouter();
  const [logOutUser] = useMutation(LOGOUT_USER);

  const handleSignOut = async () => {
    await logOutUser()
      .then((response) => {
        if (response.data) {
          props.setShowAccountMenu(false);
          changeIsLogged(false);
          changeUsername("");
          router.push({ pathname: "/signin" });
          client.resetStore();
        }
      })
      .catch();
  };

  return (
    <div className={styles.accountmenu} ref={wrapperRef}>
      <div className={styles.arrowup} />
      <div className={styles.elements}>
        <Link href="/">
          <a onClick={() => props.setShowAccountMenu(false)}>My account</a>
        </Link>
        <Link href="/">
          <a onClick={() => props.setShowAccountMenu(false)}>Todos</a>
        </Link>
        <Link href="/">
          <a onClick={() => props.setShowAccountMenu(false)}>Settings</a>
        </Link>
        <Link href="/">
          <a onClick={handleSignOut}>Sign out</a>
        </Link>
      </div>
    </div>
  );
}

export default AccountMenu;
