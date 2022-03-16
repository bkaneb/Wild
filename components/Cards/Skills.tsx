import React from "react";
import styles from "../../styles/Cards.module.css";
import { ISkills } from './AddWilder';

function Skill({ title, votes }: ISkills) {
  return (
    <li>
      {title}
      <span className={styles.votes}>{votes}</span>
    </li>
  );
}

export default Skill;
