import React, { useState, useEffect } from "react";
import { VERIFY_USER } from "../api/apollo-client";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import styles from "../../styles/activate/Activate.module.css";

function Token() {
  const router = useRouter();
  const { token } = router.query;
  const [isVerified, setIsVerified] = useState(false);
  const [verifyUser] = useMutation(VERIFY_USER);

  useEffect(() => {
    verifyUser({ variables: { token: token } })
      .then((res) => setIsVerified(res.data.verifyAccount?.success))
      .catch((error) => setIsVerified(false));
  }, [token]);

  return (
    <div className={styles.container}>
      {isVerified ? (
        <div className={styles.verified}>
          Your account has been verified successfully.
          <br />
          You can login now.
        </div>
      ) : (
        <div className={styles.notverified} />
      )}
    </div>
  );
}

export default Token;
