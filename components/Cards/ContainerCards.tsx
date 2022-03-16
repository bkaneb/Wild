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
  const [trigger, setTrigger] = useState<number>(0);
  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const data : Data = await (await axios.get("http://localhost:8000/api/wilder")).data;
        console.log(data);
        setCurrentWilder(data.result);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchWilders();
  }, [trigger]);

  return (
    <main className={styles.container}>
      <h2>Wilders</h2>
      <section className={styles.cardRow}>
        {currentWilder.map((wilder, index) => {
          return (
            <Cards
              {...wilder}
              key={index}
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