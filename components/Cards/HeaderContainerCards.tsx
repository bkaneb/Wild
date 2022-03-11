import React from "react";
import Link from "next/link";
import styles from "../../styles/ContainerCards.module.css";

function WildersBook() {
  return (
    <header>
      <div className={styles.container}>
        <h1>Wilders Book</h1>
        <Link href="http://localhost:3000/addWilder" passHref>Add Wilder</Link>
        <Link href="http://localhost:3000/updateWilder" passHref>Update Wilder</Link>
      </div>
    </header>
  );
}

export default WildersBook;
