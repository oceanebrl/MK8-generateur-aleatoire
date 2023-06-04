"use client";
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "../../styles/components/kart/gallery.module.scss";

import arrowTop from "@/public/arrowTop.png";
import arrowBottom from "@/public/arrowBottom.png";
import resetBtn from "@/public/resetBtn.png";
import shuffleBtn from "@/public/shuffleBtn.png";

function Gallery({ itemList, resetFunction, shuffleFunction }) {
  // d'abord, on vient vérifier la largeur de l'écran,
  // nos galleries seront à la verticale avant 700px
  // et à l'horizontale si l'écran est inférieure à 700px
  const [isWideScreen, setIsWideScreen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // permet de faire une sorte de caroussel manuel
  const [index, setIndex] = useState(0);
  const halfwayItems = Math.ceil(itemList.length / 2); // calcule la moitié de la liste
  const itemHeight = isWideScreen ? 90 : 100; // définit la hauteur des items
  // permet de savoir quand déplacer les items de bas en haut et viceverca
  const shuffleItem = halfwayItems * itemHeight;
  // permet de garder les items au centre de rester visible
  const visibleItem = shuffleItem / 2;
  // on va créer une fonction qui détermnera où se situe l'item central
  const determineItem = (itemIndex) => {
    if (index === itemIndex) return 0;
    if (itemIndex >= halfwayItems) {
      if (index > itemIndex - halfwayItems) {
        return (itemIndex - index) * itemHeight;
      } else {
        return -(itemList.length + index - itemIndex) * itemHeight;
      }
    }
    if (itemIndex > index) {
      return (itemIndex - index) * itemHeight;
    }
    if (itemIndex < index) {
      if ((index - itemIndex) * itemHeight >= shuffleItem) {
        return (itemList.length - (index - itemIndex)) * itemHeight;
      }
      return -(index - itemIndex) * itemHeight;
    }
  };
  // fonction pour les flèches
  const handleClick = (direction) => {
    // afin d'éviter de faire deux fonctions qui font relativement la même chose,
    // on va venir ajouter une direction avec un string "next"
    setIndex((prevIndex) => {
      if (direction === "next") {
        if (prevIndex + 1 > itemList.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }
      if (prevIndex - 1 < 0) {
        return itemList.length - 1;
      }
      return prevIndex - 1;
    });
  };

  // permet de contrôler le scroll mannuel à la souris
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleTouchStart = (e) => {
    setIsScrolling(true);
    setStartPosition(
      isWideScreen ? e.touches[0].clientY : e.touches[0].clientX
    );
  };

  const handleTouchMove = (e) => {
    if (isScrolling) {
      const currentPosition = isWideScreen
        ? e.touches[0].clientY
        : e.touches[0].clientX;
      setScrollPosition(startPosition - currentPosition);
    }
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
    if (Math.abs(scrollPosition) > 50) {
      if (scrollPosition > 0) {
        handleClick("next");
      } else {
        handleClick("prev");
      }
    }
    setScrollPosition(0);
  };

  return (
    <div
      className={styles.wrap}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div
        className={`${styles.btnFunction} ${styles.shuffle}`}
        onClick={shuffleFunction}>
        <Image
          src={shuffleBtn}
          alt="Bouton pour mélanger"
          className={styles.btnFunction__img}
        />
      </div>
      <div
        className={`${styles.btnFunction} ${styles.reset}`}
        onClick={resetFunction}>
        <Image
          src={resetBtn}
          alt="Bouton pour réinitialiser"
          className={styles.btnFunction__img}
        />
      </div>
      <div
        onClick={() => handleClick("prev")}
        className={`${styles.btn} ${styles.btn__top}`}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}>
        <Image
          src={arrowTop}
          alt="Flèche qui pointe vers le haut"
          className={styles.btn__img}
        />
      </div>
      <div className={styles.wrapGallery}>
        {itemList.map((item, i) => (
          <div
            key={item.id}
            className={`${styles.item} ${index === i ? styles.active : ""} ${
              Math.abs(determineItem(i)) <= visibleItem ? styles.visible : ""
            }`}
            style={{
              transform: `translate${isWideScreen ? "Y" : "X"}(${determineItem(
                i
              )}px)`,
            }}
            onClick={() => {
              setIndex(i);
            }}>
            <Image
              src={item.image}
              alt={item.name}
              className={styles.item__img}
            />
          </div>
        ))}
      </div>
      <div
        onClick={() => handleClick("next")}
        className={styles.btn}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}>
        <Image
          src={arrowBottom}
          alt="Flèche qui pointe vers le bas"
          className={styles.btn__img}
        />
      </div>
    </div>
  );
}

export default Gallery;
