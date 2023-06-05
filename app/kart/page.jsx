"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Gallery from "../components/kart/Gallery";

import styles from "../styles/pages/kart.module.scss";
import optionStyle from "../styles/modules/optionStyle.module.scss";

import { kartLists } from "@/datas/kartList";
import { wheelsList } from "@/datas/wheelList";
import { glidersList } from "@/datas/gliderList";

import OptionBtn from "../components/OptionBtn";

function Karts() {
  // l'index nous permet de savoir la position des items dans les galleries
  const [indexKart, setIndexKart] = useState(0);
  const [indexWheel, setIndexWheel] = useState(0);
  const [indexGlider, setIndexGlider] = useState(0);
  // on vient créer les states pour chaque élément
  // les véhicules
  const [pickedKarts, setPickedKarts] = useState([]);
  const [lastPickedKart, setLastPickedKart] = useState("");
  // les roues
  const [pickedWheels, setPickedWheels] = useState([]);
  const [lastPickedWheel, setLastPickedWheel] = useState("");
  // les parapentes
  const [pickedGliders, setPickedGliders] = useState([]);
  const [lastPickedGlider, setLastPickedGlider] = useState("");
  // on vient vérifier si on a des éléments dans notre local storage
  // puisque l'on a six entrées différentes, on les condence dans un tableau
  useEffect(() => {
    // premier tableau avec les items sélectionnés
    const savedItem = [
      { key: "pickedKarts", state: setPickedKarts },
      { key: "pickedWheels", state: setPickedWheels },
      { key: "pickedGliders", state: setPickedGliders },
    ];
    savedItem.forEach((item) => {
      const savedValue = JSON.parse(localStorage.getItem(item.key)) || [];
      item.state(savedValue);
    });
    // deuxième tableau avec les derniers items qui ont été sélectionnés
    // on ne veut pas que nots derniers items créés un tableau,
    //  donc on  doit les séparer
    const savedLastItem = [
      { key: "lastPickedKart", state: setLastPickedKart },
      { key: "lastPickedWheels", state: setLastPickedWheel },
      { key: "lastPickedGlider", state: setLastPickedGlider },
    ];
    savedLastItem.forEach((item) => {
      const savedValue = JSON.parse(localStorage.getItem(item.key));
      item.state(savedValue);
    });
  }, []);

  // fonction globale pour tirer aléatoirement nos items
  const pickRandomItem = (
    pickedItems,
    itemList,
    alertMessage,
    setPickedItems,
    setLastPickedItem
  ) => {
    const remainingChoices = itemList.filter(
      (item) => !pickedItems.find((pickedItem) => pickedItem.id === item.id)
    );
    if (remainingChoices.length === 0) {
      alert(alertMessage); // futur modal
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingChoices.length);
    const randomItem = remainingChoices[randomIndex];
    setPickedItems([...pickedItems, randomItem]);
    setLastPickedItem(randomItem);
  };
  // on l'implente pour les véhicules
  const pickRandomKart = () => {
    pickRandomItem(
      pickedKarts,
      kartLists,
      "Il n'y a plus de véhicule disponible",
      setPickedKarts,
      setLastPickedKart
    );
  };
  // pour les roues
  const pickRandomWheel = () => {
    pickRandomItem(
      pickedWheels,
      wheelsList,
      "Il n'y a plus de roue disponible",
      setPickedWheels,
      setLastPickedWheel
    );
  };
  // pour les parapentes
  const pickRandomGlider = () => {
    pickRandomItem(
      pickedGliders,
      glidersList,
      "Il n'y a plus de parapente disponible",
      setPickedGliders,
      setLastPickedGlider
    );
  };
  // et une fonction qui allie les trois
  const pickAllRandom = () => {
    pickRandomKart();
    pickRandomWheel();
    pickRandomGlider();
  };
  // on créé des fonctions de la même façon pour supprimer
  const resetItems = (setPickedItems, setLastPickedItem, setIndexItem) => {
    setPickedItems([]);
    setLastPickedItem("");
    setIndexItem(0);
  };
  const resetKart = () => {
    resetItems(setPickedKarts, setLastPickedKart, setIndexKart);
  };
  const resetWheels = () => {
    resetItems(setPickedWheels, setLastPickedWheel, setIndexWheel);
  };
  const resetGlider = () => {
    resetItems(setPickedGliders, setLastPickedGlider, setIndexGlider);
  };
  const resetAll = () => {
    resetKart();
    resetWheels();
    resetGlider();
  };

  // on vient enregister notre liste d'item dans le local storage, avec nos
  // derniers éléments afin de les récupérer avec le premier useEffect de la page
  useEffect(() => {
    const stateItems = [
      { key: "pickedKarts", value: pickedKarts },
      { key: "lastPickedKart", value: lastPickedKart },
      { key: "pickedWheels", value: pickedWheels },
      { key: "lastPickedWheels", value: lastPickedWheel },
      { key: "pickedGliders", value: pickedGliders },
      { key: "lastPickedGlider", value: lastPickedGlider },
    ];
    stateItems.forEach((item) => {
      localStorage.setItem(item.key, JSON.stringify(item.value));
    });
  }, [
    pickedKarts,
    lastPickedKart,
    pickedWheels,
    lastPickedWheel,
    pickedGliders,
    lastPickedGlider,
  ]);

  return (
    <main>
      <h2>Choisis la composition de ton véhicule</h2>
      <section className={styles.pageWrap}>
        <div className={optionStyle.option}>
          <div className={optionStyle.option__btn}>
            <OptionBtn name="Choisis pour moi !" btnFunction={pickAllRandom} />
            <OptionBtn name="Réinitialiser" btnFunction={resetAll} />
          </div>
          <div
            className={`${styles.wrapSelected} ${
              !lastPickedKart && !lastPickedWheel && !lastPickedGlider
                ? styles.empty
                : ""
            }`}>
            <div
              className={`${styles.selected} ${styles.kart} ${
                !lastPickedKart && styles.empty
              }`}>
              {lastPickedKart && (
                <Image
                  src={lastPickedKart.image}
                  alt={lastPickedKart.name}
                  className={styles.selected__image}
                  title={lastPickedKart.name}
                />
              )}
            </div>
            <div className={styles.wrapSelected__wheelsnglider}>
              <div
                className={`${styles.selected} ${styles.wheel} ${
                  !lastPickedWheel && styles.empty
                }`}>
                {lastPickedWheel && (
                  <Image
                    src={lastPickedWheel.image}
                    alt={lastPickedWheel.name}
                    className={styles.selected__image}
                    title={lastPickedWheel.name}
                  />
                )}
              </div>
              <div
                className={`${styles.selected} ${styles.glider} ${
                  !lastPickedGlider && styles.empty
                }`}>
                {lastPickedGlider && (
                  <Image
                    src={lastPickedGlider.image}
                    alt={lastPickedGlider.name}
                    className={styles.selected__image}
                    title={lastPickedGlider.name}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.galleryWrap}>
          <Gallery
            itemList={kartLists}
            resetFunction={resetKart}
            shuffleFunction={pickRandomKart}
            picked={pickedKarts}
            setPicked={setPickedKarts}
            lastPicked={lastPickedKart}
            setLastPicked={setLastPickedKart}
            index={indexKart}
            setIndex={setIndexKart}
          />
          <Gallery
            itemList={wheelsList}
            resetFunction={resetWheels}
            shuffleFunction={pickRandomWheel}
            picked={pickedWheels}
            setPicked={setPickedWheels}
            lastPicked={lastPickedWheel}
            setLastPicked={setLastPickedWheel}
            index={indexWheel}
            setIndex={setIndexWheel}
          />
          <Gallery
            itemList={glidersList}
            resetFunction={resetGlider}
            shuffleFunction={pickRandomGlider}
            picked={pickedGliders}
            setPicked={setPickedGliders}
            lastPicked={lastPickedGlider}
            setLastPicked={setLastPickedGlider}
            index={indexGlider}
            setIndex={setIndexGlider}
          />
        </div>
      </section>
    </main>
  );
}

export default Karts;
