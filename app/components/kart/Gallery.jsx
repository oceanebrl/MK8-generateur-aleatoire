"use client";
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "../../styles/components/kart/gallery.module.scss";

import arrowTop from "@/public/arrowTop.png";
import arrowRight from "@/public/arrowRight.png";
import arrowBottom from "@/public/arrowBottom.png";
import arrowLeft from "@/public/arrowLeft.png";

function Gallery({ itemList }) {
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

  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const halfwayItems = Math.ceil(itemList.length / 2);
  const itemHeight = isWideScreen ? 90 : 100;
  const shuffleItem = halfwayItems * itemHeight;
  const visibleItem = shuffleItem / 2;

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

  const handleClick = (direction) => {
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
        className={styles.btn}
        style={{
          display: isWideScreen ? "block" : "none",
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
        className={styles.btn}
        style={{
          display: isWideScreen ? "block" : "none",
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
