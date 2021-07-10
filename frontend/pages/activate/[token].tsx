import React, { useState, useEffect } from "react";
import { VERIFY_USER } from "../api/apollo-client";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import styles from "../../styles/activate/Activate.module.css";

function Token() {
  const router = useRouter();
  const { token } = router.query;
  const [verifyUser] = useMutation(VERIFY_USER);

  useEffect(() => {
    verifyUser({ variables: { token: token } });
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.verified}>
        Your account has been verified successfully.
        <br />
        You can login now.
      </div>
    </div>
  );
}

export default Token;
