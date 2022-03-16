import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "../../styles/AddWilder.module.css";
import Link from "next/link";

export interface ISkills {
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
  const [skills, setSkills] = useState<ISkills[]>([]);

  const fetchAddWilders = async () => {
    try {
      setSuccess("");
      await axios.post("http://localhost:8000/api/wilder", {
        name: name,
        city: city,
        skills: skills.map((skill) => {
          return {
            title: skill.title,
            votes: skill.votes,
          };
        }),
      });
      const skillLength: number = skills.length;
      for (let i = 1; i < skillLength; i++) {
        skills.pop();
      }
      setName("");
      setCity("");
      setTitle("");
      setVotes(0);
      setSuccess("Ajouté");
    } catch (error: unknown) {
      setError("Ajout impossible");
    }
  };

  const handleClickAddSkills = () => {
    let titleDuplicate: boolean = false;
    skills.map((skill) => {
      if (skill.title === title) return (titleDuplicate = true);
    });
    setSuccess("");
    if (title === "") return setError("Title it's empty");
    if (votes > 10) return setError("the value is too large");
    if (!titleDuplicate) {
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
    } else {
      return setError("Title duplicate");
    }
  };

  const handleDeleteSkills = (index: number) => {
    skills.splice(index, 1);
    setSkills([...skills]);
  };

  return (
    <>
      <Link href="http://localhost:3000/" passHref>
        <a className="link">Return</a>
      </Link>{" "}
      <div className={styles.container}>
        <form
          onSubmit={(e : FormEvent<HTMLFormElement>) => {
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
            onChange={(e : ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <label htmlFor="city-input">City :</label>
          <input
            id="city-input"
            type="text"
            placeholder="Type the city"
            value={city}
            onChange={(e : ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
          />
          <div className={styles.containerFormSkills}>
            <label htmlFor="name-input">Title :</label>
            <input
              id="title-input"
              type="text"
              placeholder="Type the title"
              value={title}
              onChange={(e : ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <label htmlFor="name-input">Votes :</label>
            <input
              id="vote-input"
              type="number"
              placeholder="Type the number"
              value={votes}
              onChange={(e : ChangeEvent<HTMLInputElement>) => setVotes(parseInt(e.target.value))}
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
                <button
                  style={{
                    borderRadius: "50%",
                    margin: "0.5em",
                    cursor: "pointer",
                  }}
                  type="button"
                  onClick={() => {
                    handleDeleteSkills(index);
                  }}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
