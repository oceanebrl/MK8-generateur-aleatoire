"use client";

import CoursesList from "../components/courses/CoursesList";
import CoursesSelection from "../components/courses/CoursesSelection";

import { useEffect, useState } from "react";
import { coursesList } from "@/datas/coursesList";

import styles from "../styles/pages/courses.module.scss";

function Course() {
  const [pickedCourses, setPickedCourses] = useState([]);
  const [lastPickedCourses, setLastPickedCourses] = useState([]);
  const [courseNumberInput, setCourseNumberInput] = useState(1);
  const courses = coursesList.flatMap((cup) => cup.courses);
  const remainingCourses = courses.length - pickedCourses.length;
  // on vient vérifier si on a des données dans le local storage...
  useEffect(() => {
    const savedPickedCourses =
      JSON.parse(localStorage.getItem("pickedCourses")) || [];
    const savedLastrPickedCourses =
      JSON.parse(localStorage.getItem("lastPickedCourses")) || [];
    setPickedCourses(savedPickedCourses);
    setLastPickedCourses(savedLastrPickedCourses);
  }, []);

  // on vient créer une fonction qui vérifie le nombre de courses restantes
  // en fonction de ce que l'utilisateur veut comme nombre
  // afin d'éviter les bugs. On le réutilise  dans l'input et le bouton
  // random
  const validateCourseSelection = (selectedCourses, remainingCourses) => {
    if (remainingCourses === 0) {
      alert(`Il n'y a plus aucune course.`);
      return false;
    } else if (selectedCourses > remainingCourses) {
      alert(`Il n'y a pas plus de ${remainingCourses} courses restantes!`);
      return false;
    } else if (remainingCourses < 0) {
      alert("Il n'y a plus aucune course. Tu devrais réinitialiser.");
      return false;
    }
    return true;
  };

  const pickRandomCourses = () => {
    // on vérifie les courses restantes pour éviter d'en sélectionner
    const remainingChoices = courses.filter(
      (course) => !pickedCourses.find((pickedCourse) => pickedCourse === course)
    );
    if (!validateCourseSelection(courseNumberInput, remainingChoices.length)) {
      return;
    }
    const randomCourses = [];
    // on vient boucler notre sélection aléatoire en fonction
    // du nombre choisis par l'utilisateur.
    for (let i = 0; i < courseNumberInput; i++) {
      const randomIndex = Math.floor(Math.random() * remainingChoices.length);
      const randomCourse = remainingChoices[randomIndex];
      randomCourses.push(randomCourse);
      remainingChoices.splice(randomIndex, 1);
    }
    // on let met dans nos states
    setLastPickedCourses(randomCourses);
  };

  // fonction qui nous permet de sélectionner manuellement les courses,
  // que ce soit dans l'apparition des courses aléatoires, ou bien dans les
  // dans les coureses affichées dans la seconde section
  const selectCourse = (course) => {
    // on vérifies les courses déjà sélectionnées
    const isCoursePicked = pickedCourses.find(
      (pickedCourse) => pickedCourse.id === course.id
    );
    // si la course a déjà été sélectionnées, on la supprime
    if (isCoursePicked) {
      const updatedCourses = pickedCourses.filter(
        (pickedCourse) => pickedCourse.id !== course.id
      );
      setPickedCourses(updatedCourses);
    } else {
      // dans le cas où la course n'a pas été sélectionnée,
      // on renvoie les données avec la sélection
      setPickedCourses([...pickedCourses, course]);
    }
  };

  const resetCourses = () => {
    setPickedCourses([]);
    setLastPickedCourses([]);
  };

  // on sauvegarde dans le local storage...
  useEffect(() => {
    localStorage.setItem("pickedCourses", JSON.stringify(pickedCourses));
    localStorage.setItem(
      "lastPickedCourses",
      JSON.stringify(lastPickedCourses)
    );
  });

  // on vient vérifier les courses sélectionnées pour leur attribué un style
  const isCoursePicked = (course) => {
    return !!pickedCourses.find(
      (pickedCourse) => pickedCourse.id === course.id
    );
  };

  return (
    <main>
      <h2>Choisis ta ou tes courses</h2>
      <section className={styles.pageWrap}>
        <CoursesSelection
          cups={coursesList}
          randomFunction={pickRandomCourses}
          resetFunction={resetCourses}
          courseNumberInput={courseNumberInput}
          setCourseNumberInput={setCourseNumberInput}
          lastPickedCourses={lastPickedCourses}
          remainingCourses={remainingCourses}
          validateCourseSelection={validateCourseSelection}
          selectCourse={selectCourse}
          isCoursePicked={isCoursePicked}
        />
        <CoursesList
          cups={coursesList}
          isCoursePicked={isCoursePicked}
          selectCourse={selectCourse}
        />
      </section>
    </main>
  );
}

export default Course;
