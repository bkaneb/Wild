import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import styles from "../../styles/ContainerCards.module.css";

function ContainerCards() {
  const [currentWilder, setCurrentWilder] = useState<[]>([]);
  const [trigger, setTrigger] = useState<number>(0);
  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8000/api/wilder"
        );
        setCurrentWilder(result.data.result);
      } catch (error) {
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
          return <Cards {...wilder} key={index} trigger={trigger} setTrigger={setTrigger}/>;
        })}
      </section>
    </main>
  );
}

export default ContainerCards;
