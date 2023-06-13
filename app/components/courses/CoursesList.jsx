"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/components/courses/coursesList.module.scss";

function CoursesList({ cups }) {
  const [openCups, setOpenCups] = useState(Array(cups.length).fill(false));

  const handleCupOpen = (cupIndex) => {
    setOpenCups((prevOpenCups) => {
      const updatedOpenCups = [...prevOpenCups];
      updatedOpenCups[cupIndex] = true;
      return updatedOpenCups;
    });
  };

  const handleCupClose = (cupIndex) => {
    setOpenCups((prevOpenCups) => {
      const updatedOpenCups = [...prevOpenCups];
      updatedOpenCups[cupIndex] = false;
      return updatedOpenCups;
    });
  };

  return (
    <section className={styles.courses}>
      {cups.map((cup, index) => (
        <div
          key={cup.id}
          className={`${styles.cup} ${openCups[index] ? styles.open : ""}`}
          onMouseLeave={() => handleCupClose(index)}>
          <div
            className={`${styles.cup__img} ${
              openCups[index] ? styles.open : ""
            }`}>
            <Image
              src={cup.image}
              alt={cup.name}
              onMouseEnter={() => handleCupOpen(index)}
              title={cup.name}
            />
          </div>
          {openCups[index] &&
            cup.courses.map((course) => (
              <div
                key={course.id}
                className={`${styles.cup__courses} ${
                  openCups[index] ? styles.open : ""
                }`}>
                <Image
                  src={course.image}
                  alt={course.name}
                  className={styles.cup__courses__img}
                  title={course.name}
                />
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}

export default CoursesList;
