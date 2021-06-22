import React from "react";
import styles from "../styles/signup/Signup.module.css";

function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>TEKST</div>
      <div className={styles.right}>
        <form className={styles.form}>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Retype password" />
          <div>
            <input type="checkbox" className={styles.checkbox} />
            <label>Agree</label>
          </div>
          <button className={styles.btn1} type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
