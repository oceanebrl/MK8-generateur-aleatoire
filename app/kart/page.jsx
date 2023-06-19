"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Gallery from "../components/kart/Gallery";
import Modal from "../components/Modal";

import styles from "../styles/pages/kart.module.scss";
import optionStyle from "../styles/modules/optionStyle.module.scss";
import toadworth from "@/public/illustrations/toadsworth.png";

import { kartLists } from "@/datas/kartList";
import { wheelsList } from "@/datas/wheelList";
import { glidersList } from "@/datas/gliderList";

import OptionBtn from "../components/OptionBtn";

function Karts() {
  // l'index nous permet de savoir la position des items dans les galleries
  const [indexKart, setIndexKart] = useState(0);
  const [indexWheel, setIndexWheel] = useState(0);
  const [indexGlider, setIndexGlider] = useState(0);
  // on vient également initier un state pour savoir
  // quand ouvrir notre modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // on vient créer les states pour chaque élément
  // les véhicules
  const [pickedKarts, setPickedKarts] = useState([]);
  const [lastPickedKart, setLastPickedKart] = useState("");
  // les roues
  const [pickedWheels, setPickedWheels] = useState([]);
  const [lastPickedWheel, setLastPickedWheel] = useState("");
  // les deltaplanes
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
    // donc on doit les séparer
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
    setPickedItems,
    setLastPickedItem
  ) => {
    const remainingChoices = itemList.filter(
      (item) => !pickedItems.find((pickedItem) => pickedItem.id === item.id)
    );
    if (remainingChoices.length === 0) {
      setIsModalOpen(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingChoices.length);
    const randomItem = remainingChoices[randomIndex];
    setPickedItems([...pickedItems, randomItem]);
    setLastPickedItem(randomItem);
  };
  // on l'implente pour les véhicules
  const pickRandomKart = () => {
    pickRandomItem(pickedKarts, kartLists, setPickedKarts, setLastPickedKart);
  };
  // pour les roues
  const pickRandomWheel = () => {
    pickRandomItem(
      pickedWheels,
      wheelsList,
      setPickedWheels,
      setLastPickedWheel
    );
  };
  // pour les parapentes
  const pickRandomGlider = () => {
    pickRandomItem(
      pickedGliders,
      glidersList,
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

  // on paramètre ici ce que notrem modal doit afficher
  // en fonction des items non disponibles
  let modalTitle = "";
  let modalChild = "";

  if (
    pickedKarts.length === kartLists.length &&
    pickedWheels.length === wheelsList.length &&
    pickedGliders.length === glidersList.length
  ) {
    modalTitle = "Okay, bon là t'as plus rien de disponible";
    modalChild = (
      <>
        <p>
          Moi la question que je me pose maintenant, c&apos;est comment
          t&apos;as fait pour en arriver là&#8239;.
        </p>
        <p>
          T&apos;as bourriné le bouton comme un fou ou t&apos;as
          bidouillé&#8239;?
          <br />
          <span>
            Dans les deux cas, t&apos;as juste gagné le droit de recommencer, ou
            de ne rien faire de plus.
          </span>
        </p>
      </>
    );
  } else if (
    pickedWheels.length === wheelsList.length &&
    pickedGliders.length === glidersList.length
  ) {
    modalTitle = "Bon, tu peux pas rouler ni planer";
    modalChild = (
      <>
        <p>
          T&apos;as plus de choix pour les roues et les deltaplanes. C&apos;est
          un peu embêtant.
        </p>
        <p>
          Enfin, c&apos;est embêtant à moins que tu sois là juste pour la
          sélection de kart. Si c&apos;est le cas, tu devrais fermer le modal et
          survoler les karts pour voir les boutons s&apos;afficher.
          <br />
          <span>
            De cette façon tu pourras randomiser que les karts. M&apos;enfin,
            fais comme tu veux après. Tu peux réinitialiser ces deux trucs
            aussi.
          </span>
        </p>
      </>
    );
  } else if (
    pickedKarts.length === kartLists.length &&
    pickedWheels.length === wheelsList.length
  ) {
    modalTitle = "Plus de karts plus de roues...";
    modalChild = (
      <>
        <p>
          On se croirait presque dans Mario Party, avec un mini-jeu uniquement
          en deltaplane.
        </p>
        <p>
          Mais bon, ce site est pour Mario Kart, pas Mario deltaplane, donc tu
          devrais les réinitialiser.
          <br />
          <span>
            Ou alors ton but c&apos;est juste de changer ton deltaplane, dans ce
            cas là, qui suis-je pour juger&#8239;?
          </span>
        </p>
      </>
    );
  } else if (
    pickedKarts.length === kartLists.length &&
    pickedGliders.length === glidersList.length
  ) {
    modalTitle = "Pas de karts, pas de deltaplane, uh.";
    modalChild = (
      <>
        <p>
          Bon, peut-être qu&apos;on s&apos;en fiche du deltaplane, mais puisque
          mon but est de te prévenir de toute éventualité, bah me voilà quand
          même.
        </p>
        <p>
          Tu devrais réinitialiser le kart <span>et la chose inutile</span>.
          <br />
          <span>Ou encore une fois, fais comme tu veux.</span>
        </p>
      </>
    );
  } else if (pickedKarts.length === kartLists.length) {
    modalTitle = "Oops, pas sûr, mais ça va être dur sans kart";
    modalChild = (
      <>
        <p>
          Je veux pas t&apos;inquiéter hein, mais je crois que c&apos;est la
          partie la plus importante de ta compo.
        </p>
        <p>
          Tu peux les réinitialiser facilement ici si tu le veux.
          <br />
          <span>
            Et si tu veux pas, bah y a pas grand-chose de plus que je peux faire
            pour toi.
          </span>
        </p>
      </>
    );
  } else if (pickedWheels.length === wheelsList.length) {
    modalTitle = "Ca va moins bien rouler, ah. T'as compris ?";
    modalChild = (
      <>
        <p>
          L&apos;humour c&apos;est pas mon fort. Mais en tout cas, c&apos;est
          sûr que ton kart va pas avancer sans roues.
        </p>
        <p>
          Avant que le jeu soit entièrement en anti-gravité, ou carrément avec
          des propulseurs, tu devrais réinitialiser les roues.
          <br />
          <span>Je pense quand même que ma blague était drôle.</span>
        </p>
      </>
    );
  } else if (pickedGliders.length === glidersList.length) {
    modalTitle = "Mince, tu ne peux plus planer dans les airs";
    modalChild = (
      <>
        <p>
          Ouais... Je sais. Y a vraiment très peu de deltaplane, hein&#8239;?
        </p>
        <p>
          M&apos;enfin, il n&apos;y en a plus de disponible. Tu devrais les
          réinitialiser.
        </p>
        <p>
          Ou alors tu t&apos;en fiches, et tu peux aussi fermer ce modal.
          <br />
          <span>
            Entre nous, je crois pas que ça fasse une grande différence.
          </span>
        </p>
      </>
    );
  }

  // fonction qui nous permet de reset les éléments après ouverture du modal
  const resetInModal = () => {
    if (pickedKarts.length === kartLists.length) {
      resetKart();
    }
    if (pickedWheels.length === wheelsList.length) {
      resetWheels();
    }
    if (pickedGliders.length === glidersList.length) {
      resetGlider();
    }
  };

  // allie fermeture du modal et reset
  const resetCloseModal = () => {
    resetInModal();
    setIsModalOpen(false);
  };

  // fermeture du modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <h2>Choisis la composition de ton véhicule</h2>
      {isModalOpen && (
        <Modal
          title={modalTitle}
          btnFunctionClose={closeModal}
          btnFunctionReset={resetCloseModal}
          modalImg={toadworth}
          modalImgAlt="Papy Champi">
          {modalChild}
        </Modal>
      )}
      <section className={styles.pageWrap} draggable="none">
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
