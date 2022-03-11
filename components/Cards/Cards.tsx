import React from "react";
import axios from "axios";
import Image from "next/image";
import blank_profile from "../../public/blank_profile.png";
import Skills from "./Skills";
import styles from "../../styles/Cards.module.css";

export interface CardProps {
  readonly name: string;
  readonly city: string;
  readonly skills: [
    {
      title: string;
      votes: number;
    }
  ];
  readonly _id: string;
  trigger: number;
  setTrigger: Function;
}

function Cards({ name, city, skills, _id, trigger, setTrigger }: CardProps) {
  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `http://localhost:8000/api/wilder/${_id}`
      );
      setTrigger(trigger + 1);
    } catch (error) {
      console.log(error);
    }
  };
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
        {skills
          ? skills.map((skill, index) => {
              return <Skills {...skill} key={index} />;
            })
          : null}
      </ul>
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
}

export default Cards;
