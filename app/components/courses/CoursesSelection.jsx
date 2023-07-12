import Image from "next/image";

import OptionBtn from "../OptionBtn";

import styles from "../../styles/components/courses/coursesSelection.module.scss";
import optionStyle from "../../styles/modules/optionStyle.module.scss";
import pickedStyle from "../../styles/modules/pickedStyle.module.scss";

import checkMark from "@/public/check.png";

function CoursesSelection({
  randomFunction,
  courseNumberInput,
  setCourseNumberInput,
  remainingCourses,
  resetFunction,
  lastPickedCourses,
  validateCourseSelection,
  selectCourse,
  isCoursePicked,
}) {
  // vient vérifier que le nombre de courses sélectionnées correspond
  // au nombre de courses restantes
  const handleInput = (e) => {
    const input = e.target.value;
    if (validateCourseSelection(input, remainingCourses)) {
      setCourseNumberInput(input);
    }
  };

  // permet de triggered la fonction random avec la touche entrée
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      randomFunction();
    } else if (e.key === "Delete") {
      resetFunction();
    }
  };

  // nous permet d'afficher le nombres de courses restantes
  const remainingChoicesPara = () => {
    if (remainingCourses === 0) {
      return "Il n'y a plus aucune course de disponible.";
    } else if (remainingCourses === 1) {
      return "Il ne reste plus qu'une seule course.";
    } else {
      return `Il reste ${remainingCourses} courses.`;
    }
  };

  return (
    <section className={styles.selectionWrap}>
      <div className={styles.optionWrap}>
        <div className={styles.input}>
          <label htmlFor="courseNumber" className={styles.input__label}>
            Nombre de courses à générer&#8239;{" "}
          </label>
          <input
            className={styles.input__number}
            type="number"
            value={courseNumberInput}
            max={remainingCourses}
            min="1"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <p className={styles.input__remainingCourses}>
            {remainingChoicesPara()}
          </p>
        </div>
        <div className={optionStyle.option__btn}>
          <OptionBtn name="Choisis pour moi !" btnFunction={randomFunction} />
          <OptionBtn name="Réinitialiser" btnFunction={resetFunction} />
        </div>
      </div>
      <div
        className={`${styles.lastCourses}  ${
          lastPickedCourses.length === 0 ? styles.empty : ""
        }`}>
        {lastPickedCourses.map((course) => (
          <div
            key={course.id}
            className={`${styles.lastCourses__wrap} ${pickedStyle.item}`}
            onClick={() => selectCourse(course)}>
            {isCoursePicked(course) && (
              <Image
                src={checkMark}
                className={`${pickedStyle.item__check} ${styles.check}`}
                alt="Coche"
              />
            )}
            <Image
              alt={course.name}
              src={course.image}
              className={`${styles.lastCourses__wrap__img} ${
                pickedStyle.item__image
              } ${isCoursePicked(course) ? pickedStyle.picked : ""}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CoursesSelection;
