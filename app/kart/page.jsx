"use client";
import React, { useEffect, useState } from "react";

import Gallery from "../components/kart/Gallery";

import styles from "../styles/pages/kart.module.scss";
import optionStyle from "../styles/modules/optionStyle.module.scss";

import { kartLists } from "@/datas/kartList";
import { wheelsList } from "@/datas/wheelList";
import { glidersList } from "@/datas/gliderList";

import OptionBtn from "../components/OptionBtn";
import { driverList } from "@/datas/driverList";

function Karts() {
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
  useEffect(() => {
    const savedItem = [
      { key: "pickedKarts", state: setPickedKarts },
      { key: "lastPickedKart", state: setLastPickedKart },
      { key: "pickedWheels", state: setPickedWheels },
      { key: "lastPickedWheels", state: setLastPickedWheel },
      { key: "pickedGliders", state: setPickedGliders },
      { key: "lastPickedGlider", state: setLastPickedGlider },
    ];
    savedItem.forEach((item) => {
      const savedValue = JSON.parse(localStorage.getItem(item.key)) || [];
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
      return alert(alertMessage);
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
  const resetItems = (setPickedItems, setLastPickedItem) => {
    setPickedItems([]);
    setLastPickedItem("");
  };
  const resetKart = () => {
    resetItems(setPickedKarts, setLastPickedKart);
  };
  const resetWheels = () => {
    resetItems(setPickedWheels, setLastPickedWheel);
  };
  const resetGlider = () => {
    resetItems(setPickedGliders, setLastPickedGlider);
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
            <OptionBtn name="Reset" btnFunction={resetAll} />
          </div>
          <div>Futur compo à afficher ici</div>
        </div>
        <div className={styles.galleryWrap}>
          <Gallery
            itemList={kartLists}
            resetFunction={resetKart}
            shuffleFunction={pickRandomKart}
          />
          <Gallery
            itemList={wheelsList}
            resetFunction={resetWheels}
            shuffleFunction={pickRandomWheel}
          />
          <Gallery
            itemList={glidersList}
            resetFunction={resetGlider}
            shuffleFunction={pickRandomGlider}
          />
        </div>
      </section>
    </main>
  );
}

export default Karts;
