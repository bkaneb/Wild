import Link from "next/link";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../styles/AddWilder.module.css";
import { ISkills } from "./AddWilder";
import { Data, Wilder } from "./ContainerCards";

export interface Inputs {
  name: string;
  city: string;
}

export interface DataOneWilder {
  result: Wilder;
  success: boolean;
}

function UpdateWilder() {
  const [id, setId] = useState("");
  const { handleSubmit } = useForm<Inputs>();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [title, setTitle] = useState("");
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [wilders, setWilders] = useState<Wilder[]>([]);

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const data: Data = (await axios.get("http://localhost:8000/api/wilder"))
          .data;
        setWilders(data.result);
        if (data.result[0]) {
          setId(data.result[0]._id);
          setName(data.result[0].name);
          setCity(data.result[0].city);
          setSkills(data.result[0].skills);
        }
      } catch (error: unknown) {
        const e = error as ErrorEvent;
        console.log(e.error);
      }
    };

    fetchWilders();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      setSuccess("");
      await axios.put(`http://localhost:8000/api/wilder/${id}`, {
        name: name,
        city: city,
        skills: skills.map((skill) => {
          return {
            title: skill.title,
            votes: skill.votes,
          };
        }),
      });
      const data: Data = (await axios.get("http://localhost:8000/api/wilder"))
        .data;
      setWilders(data.result);
      setTitle("");
      setVotes(0);
      setSuccess("Modifié");
    } catch (error: unknown) {
      const e = error as ErrorEvent;
      console.log(e.error);
      setError("Modification impossible");
    }
  };

  const handleClickAddSkills = () => {
    let titleDuplicate: boolean = false;
    skills.map((skill) => {
      if (skill.title === title) return (titleDuplicate = true);
    });
    setSuccess("");
    if (title === "") return setError("Title it's empty");
    if (votes > 10) return setError("the votes value is too large");
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
    } else {
      return setError("Title duplicate");
    }
  };

  const selectWilderChange = async (_id: string) => {
    setId(_id);
    try {
      const dataOneWilder: DataOneWilder = (
        await axios.get(`http://localhost:8000/api/wilder/${_id}`)
      ).data;
      setName(dataOneWilder.result.name);
      setCity(dataOneWilder.result.city);
      setSkills(dataOneWilder.result.skills);
    } catch (error: unknown) {
      const e = error as ErrorEvent;
      console.log(e.error);
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
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          {/* include validation with required or other standard HTML validation rules */}
          <label htmlFor="name-input">City :</label>
          <input
            id="city-input"
            type="text"
            placeholder="Type the city"
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
          />
          <div className={styles.containerFormSkills}>
            <label htmlFor="title-input">Title :</label>
            <input
              id="title-input"
              type="text"
              placeholder="Type the title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <label htmlFor="vote-input">Votes :</label>
            <input
              id="vote-input"
              type="number"
              placeholder="Type the number"
              value={votes}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVotes(parseInt(e.target.value))
              }
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
