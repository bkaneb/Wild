import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/AddWilder.module.css";
import Link from "next/link";

export type Skills = {
  title: string;
  votes: number;
};

export const AddWilder = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [skills, setSkills] = useState<Skills[]>([]);

  const fetchAddWilders = async () => {
    try {
      setSuccess("");
      const result = await axios.post("http://localhost:8000/api/wilder", {
        name: name,
        city: city,
        skills: skills.map((skill) => {
          return {
            title: skill.title,
            votes: skill.votes,
          };
        }),
      });
      const skillLength = skills.length;
      for (let i = 1; i < skillLength; i++) {
        skills.pop();
        console.log(skills);
      }
      setName("");
      setCity("");
      setTitle("");
      setVotes(0);
      setSuccess("Ajouté");
    } catch (error) {
      console.log(error);
      setError("Ajout impossible");
    }
  };

  const handleClickAddSkills = () => {
    setSuccess("");
    if (title === "") return setError("Title it's empty");
    if (votes > 10) return setError("the value is too large");
    setSkills([
      ...skills,
      {
        title: title,
        votes: votes,
      },
    ]);
    setTitle("");
    setVotes(0);
    setError("");
    console.log(skills);
  };

  return (
    <>
      <Link href="http://localhost:3000/" passHref>
        return
      </Link>{" "}
      <div className={styles.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchAddWilders();
          }}
        >
          <label htmlFor="name-input">Name :</label>
          <input
            id="name-input"
            type="text"
            placeholder="Type the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="city-input">City :</label>
          <input
            id="city-input"
            type="text"
            placeholder="Type the city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className={styles.containerFormSkills}>
            <label htmlFor="name-input">Title :</label>
            <input
              id="title-input"
              type="text"
              placeholder="Type the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="name-input">Votes :</label>
            <input
              id="vote-input"
              type="number"
              placeholder="Type the number"
              value={votes}
              onChange={(e) => setVotes(parseInt(e.target.value))}
            />
            <button type="button" onClick={handleClickAddSkills}>
              Add the skill
            </button>
          </div>
          {error ? <p className={styles.error}>{error}</p> : null}
          {success ? <p className={styles.success}>{success}</p> : null}
          <button>Add</button>
        </form>
        {skills.length !== 0 && (
          <div className={styles.containerSkills}>
            Skills :
            {skills.map((skill, index) => (
              <div key={index}>
                Title : {skill.title} Votes : {skill.votes}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
