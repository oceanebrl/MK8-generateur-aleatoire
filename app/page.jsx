"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./styles/pages/index.module.scss";

import { driverList } from "@/datas/driverList";
import OptionBtn from "./components/optionBtn";

import checkMark from "@/public/check.png";

export default function Home() {
  // on prépare des states pour enregistrés les pilotes sauvegardés
  // mais également le dernier pilote enregistré
  const [pickedDrivers, setPickedDrivers] = useState([]);
  const [lastPickedDriver, setLastPickedDriver] = useState("");
  const [exceptionDrivers] = ["point d'interrogation"];

  // on vient vérifier si on a des données dans le local storage
  // si c'est le cas, on vient remplire les states avec ces données
  useEffect(() => {
    const savedPickedDriver =
      JSON.parse(localStorage.getItem("pickedDrivers")) || [];
    const savedLastPickedDriver = JSON.parse(
      localStorage.getItem("lastPickedDriver")
    );
    setPickedDrivers(savedPickedDriver);
    setLastPickedDriver(savedLastPickedDriver);
  }, []);

  // fonction qui nous permet de tirer un pilote aléatoire
  const pickRandomDriver = () => {
    // d'abord on vient vérifier les pilotes restants en n'oubliant
    // pas les exceptions (qui sont ici les pilotes qui ne sont pas encore sortis)
    const remainingChoices = driverList.filter(
      (driver) =>
        !pickedDrivers.find((pickedDriver) => pickedDriver.id === driver.id) &&
        !exceptionDrivers.includes(driver.name)
    );
    // si on n'a plus aucun pilote de disponible, on vient mettre une alerte
    // sûrement à remplacer par un modal
    if (remainingChoices.length === 0) {
      alert("Tous les pilotes ont déjà été choisis");
      return;
    }
    // on vient faire un tirage sur les pilotes restants
    // et on le récupère avec randomDriver pour les mettre dans nos states
    const randomIndex = Math.floor(Math.random() * remainingChoices.length);
    const randomDriver = remainingChoices[randomIndex];
    setPickedDrivers([...pickedDrivers, randomDriver]);
    setLastPickedDriver(randomDriver);
  };

  // fonction qui réinitialise nos states en les remettant par défaut
  const resetDriver = () => {
    setPickedDrivers([]);
    setLastPickedDriver("");
  };

  // fonction qui permet de sélectionner et déselectionner manuellement
  // les pilotes en cliquant dessus
  const selectDriver = (driver) => {
    // s'il s'agit des exceptions, rien ne se passe
    if (exceptionDrivers.includes(driver.name)) {
      return;
    }
    // on vient mettre les pilotes déjà sélectionnés dans une variable
    const isDriverPicked = pickedDrivers.find(
      (pickedDriver) => pickedDriver.id === driver.id
    );
    // si le pilote sélectionné est déjà dans la liste,
    // on renvoit notre liste mais sans lui
    if (isDriverPicked) {
      const updatedDrivers = pickedDrivers.filter(
        (pickedDriver) => pickedDriver.id !== driver.id
      );
      setPickedDrivers(updatedDrivers);
    } else {
      // si le pilote n'était pas sélectionné, on renvoie les données
      // en y incluant le pilote, et on met à jour le dernier pilote sélectionné
      setPickedDrivers([...pickedDrivers, driver]);
      setLastPickedDriver(driver);
    }
  };

  // on vient enregistrer notre liste de pilotes dans le local storage
  // et aussi notre dernier pilote sauvegardé
  useEffect(() => {
    localStorage.setItem("pickedDrivers", JSON.stringify(pickedDrivers));
    localStorage.setItem("lastPickedDriver", JSON.stringify(lastPickedDriver));
  }, [pickedDrivers, lastPickedDriver]);

  // on créé une variable qui nous permet de savoir les pilotes sélectionnés
  // qu'on utilise pour créer des classes
  const isDriverPicked = (driver) => {
    return !!pickedDrivers.find(
      (pickedDriver) => pickedDriver.id === driver.id
    );
  };

  return (
    <main>
      <h2>Choisis ton pilote</h2>
      <section className={styles.pageWrap}>
        <div className={styles.option}>
          <div className={styles.option__btn}>
            <OptionBtn
              name="Choisis pour moi !"
              btnFunction={pickRandomDriver}
            />
            <OptionBtn name="Reset" btnFunction={resetDriver} />
          </div>
          {lastPickedDriver && (
            <div className={styles.selectedDriver}>
              <Image
                src={lastPickedDriver.image}
                alt={lastPickedDriver.name}
                className={styles.selectedDriver__image}
              />
              <p className={styles.selectedDriver__label}>
                {lastPickedDriver.name}
              </p>
            </div>
          )}
        </div>
        <div className={styles.driverGrid}>
          {driverList.map((driver) => (
            <div
              className={`${styles.driver}
            ${
              driver.name === "point d'interrogation"
                ? styles.unknownDriver
                : ""
            } 
            ${lastPickedDriver === driver ? styles.selected : ""}`}
              key={driver.id}
              onClick={() => selectDriver(driver)}>
              {isDriverPicked(driver) && (
                <Image
                  src={checkMark}
                  className={styles.driver__check}
                  alt="Coche"
                />
              )}
              <Image
                className={`${styles.driver__image} ${
                  isDriverPicked(driver) ? styles.picked : ""
                }`}
                src={driver.image}
                alt={driver.name}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
