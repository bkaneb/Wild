import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../styles/AddWilder.module.css";

type Inputs = {
  name: string;
  city: string;
};

export type Skills = {
  title: string;
  votes: number;
};

export type Wilder = {
  readonly name: string;
  readonly city: string;
  readonly skills: [
    {
      title: string;
      votes: number;
    }
  ];
  readonly _id: string;
};

function UpdateWilder() {
  const [id, setId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [skills, setSkills] = useState<Skills[]>([]);
  const [title, setTitle] = useState<string>("");
  const [votes, setVotes] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [wilders, setWilders] = useState<Wilder[]>([]);

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios.get("http://localhost:8000/api/wilder");
        setWilders(result.data.result);
        if (result.data.result[0]) {
          setId(result.data.result[0]._id);
          setName(result.data.result[0].name);
          setCity(result.data.result[0].city);
          setSkills(result.data.result[0].skills);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWilders();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSuccess("");
      const result = await axios.put(`http://localhost:8000/api/wilder/${id}`, {
        name: name,
        city: city,
        skills: skills.map((skill) => {
          return {
            title: skill.title,
            votes: skill.votes,
          };
        }),
      });
      const resultWilder = await axios.get("http://localhost:8000/api/wilder");
      setWilders(resultWilder.data.result);
      setTitle("");
      setVotes(0);
      setSuccess("Modifié");
    } catch (error) {
      console.log(error);
      setError("Modification impossible");
    }
  };

  const handleClickAddSkills = () => {
    setSuccess("");
    if (title === "") return setError("Title it's empty");
    if (votes > 10) return setError("the votes value is too large");
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
  };

  const selectWilderChange = async (_id: string) => {
    setId(_id);
    try {
      const result = await axios.get(`http://localhost:8000/api/wilder/${_id}`);
      setName(result.data.result.name);
      setCity(result.data.result.city);
      setSkills(result.data.result.skills);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSkills = (index: number) => {
    skills.splice(index, 1);
    setSkills([...skills]);
    console.log(skills);
  };

  return (
    <>
      <Link href="http://localhost:3000/" passHref>
        <a className="link">Return</a>
      </Link>{" "}
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="wilder-select">Wilders:</label>
          <select
            id="wilder-select"
            onChange={(e) => {
              selectWilderChange(e.target.value);
            }}
          >
            {wilders.map((wilder, index): any => (
              <option value={wilder._id} key={index}>
                {wilder.name}
              </option>
            ))}
          </select>
          {/* register your input into the hook by invoking the "register" function */}
          <label htmlFor="name-input">Name :</label>
          <input
            id="name-input"
            type="text"
            placeholder="Type the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* include validation with required or other standard HTML validation rules */}
          <label htmlFor="name-input">City :</label>
          <input
            id="city-input"
            type="text"
            placeholder="Type the city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className={styles.containerFormSkills}>
            <label htmlFor="title-input">Title :</label>
            <input
              id="title-input"
              type="text"
              placeholder="Type the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="vote-input">Votes :</label>
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

          <input type="submit" value="Update" />
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
}

export default UpdateWilder;
