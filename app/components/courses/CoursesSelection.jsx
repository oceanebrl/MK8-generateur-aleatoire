import { useState } from "react";
import Image from "next/image";

import OptionBtn from "../OptionBtn";

import styles from "../../styles/components/courses/coursesSelection.module.scss";
import optionStyle from "../../styles/modules/optionStyle.module.scss";

function CoursesSelection({
  randomFunction,
  courseNumberInput,
  setCourseNumberInput,
  remainingCourses,
  resetFunction,
  lastPickedCourses,
}) {
  const handleInput = (e) => {
    const input = e.target.value;
    // on met un message d'alerte s'il n'y a pas assez de circuits restants
    if (remainingCourses === 0) {
      alert(`Il n'y a plus aucune course.`);
    } else if (input > remainingCourses) {
      alert(`Il n'y a pas plus de ${remainingCourses} courses restantes!`);
    } else {
      setCourseNumberInput(input);
    }
  };

  // permet de triggered la fonction random avec la touche entrée
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      randomFunction();
    }
  };

  console.log(courseNumberInput);

  return (
    <section className={styles.selectionWrap}>
      <div className={styles.optionWrap}>
        <div className={styles.input}>
          <label htmlFor="courseNumber" className={styles.input__label}>
            Nombre de courses à générer&#8239;:{" "}
          </label>
          <input
            className={styles.input__number}
            id="courseNumber"
            type="number"
            value={courseNumberInput}
            max={remainingCourses}
            min="1"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={optionStyle.option__btn}>
          <OptionBtn name="Choisis pour moi !" btnFunction={randomFunction} />
          <OptionBtn name="Réinitialiser" btnFunction={resetFunction} />
        </div>
      </div>
      <div className={styles.lastCourses}>
        {lastPickedCourses.map((course) => (
          <div key={course}>
            <Image alt={course.name} src={course.image} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CoursesSelection;
