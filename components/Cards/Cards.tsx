import React from "react";
import axios from "axios";
import Image from "next/image";
import blank_profile from "../../public/blank_profile.png";
import Skills from "./Skills";
import styles from "../../styles/Cards.module.css";
import { Wilder } from "./ContainerCards";

export interface CardProps extends Wilder {
  trigger: number;
  setTrigger: (trigger : number) => void;
}

function Cards({ name, city, skills, _id, trigger, setTrigger }: CardProps) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/wilder/${_id}`);
      setTrigger(trigger + 1);
    } catch (error: unknown) {
      const e = error as ErrorEvent;
      console.log(e.error);
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
          ? skills.map((skill, index: number) => {
              return <Skills {...skill} key={index} />;
            })
          : null}
      </ul>
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
}

export default Cards;
