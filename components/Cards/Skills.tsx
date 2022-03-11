import React from "react";
import styles from "../../styles/Cards.module.css";

function Skill({ title, votes }: { title: string; votes: number }) {
  return (
    <li>
      {title}
      <span className={styles.votes}>{votes}</span>
    </li>
  );
}

export default Skill;
