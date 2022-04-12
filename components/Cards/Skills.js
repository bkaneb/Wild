import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Cards.module.css";

function Skill(props) {
  const { title, votes } = props;
  return (
    <li>
      {title}
      <span className={styles.votes}>{votes}</span>
    </li>
  );
}

export default Skill;

Skill.propTypes = {
  title: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};