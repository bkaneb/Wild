import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import blank_profile from "../../public/blank_profile.png";
import Skills from "./Skills";
import styles from "../../styles/Cards.module.css";

function Cards(props) {
  const { name, city, skills } = props;
  return (
    <article className={styles.card}>
      <Image src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim
        veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea
        commodo consequat
      </p>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <ul className={styles.skills}>
        {skills.map((skill, index) => {
          return <Skills {...skill} key={index} />;
        })}
      </ul>
    </article>
  );
}

export default Cards;

Cards.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
};
