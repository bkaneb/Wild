import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import styles from "../../styles/ContainerCards.module.css";
import { ISkills } from "./AddWilder";


export interface Wilder {
  readonly name: string;
  readonly city: string;
  readonly skills: ISkills[];
  readonly __v: number;
  readonly _id: string;
}

export interface Data {
  result : Wilder[];
  success : boolean;
}

function ContainerCards() {
  const [currentWilder, setCurrentWilder] = useState<Wilder[]>([]);
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const data : Data = (await axios.get("http://localhost:8000/api/wilder")).data;
        console.log(data);
        setCurrentWilder(data.result);
      } catch (error: unknown) {
        const e = error as ErrorEvent;
        console.log(e.error);
      }
    };

    fetchWilders();
  }, [trigger]);

  return (
    <main className={styles.container}>
      <h2>Wilders</h2>
      <section className={styles.cardRow}>
        {currentWilder.map((wilder) => {
          return (
            <Cards
              {...wilder}
              key={wilder._id}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          );
        })}
      </section>
    </main>
  );
}

export default ContainerCards;
