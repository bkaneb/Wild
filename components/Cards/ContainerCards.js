import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import styles from "../../styles/ContainerCards.module.css";

function ContainerCards() {
  const [currentWilder, setCurrentWilder] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/wilder")
      .then((res) => {
        setCurrentWilder(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className={styles.container}>
      <h2>Wilders</h2>
      <section className={styles.cardRow}>
        {currentWilder.map((wilder, index) => {
          return <Cards {...wilder} key={index} />;
        })}
      </section>
    </main>
  );
}

export default ContainerCards;
