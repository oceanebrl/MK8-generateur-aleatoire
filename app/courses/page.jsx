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

  const pickRandomCourses = () => {
    // on vérifie les courses restantes pour éviter d'en sélectionner
    const remainingChoices = courses.filter(
      (course) => !pickedCourses.find((pickedCourse) => pickedCourse === course)
    );
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
    setPickedCourses([...pickedCourses, ...randomCourses]);
    setLastPickedCourses(randomCourses);
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
        />
        <CoursesList cups={coursesList} />
      </section>
    </main>
  );
}

export default Course;
