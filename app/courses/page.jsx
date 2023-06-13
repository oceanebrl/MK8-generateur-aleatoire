import CoursesList from "../components/courses/CoursesList";

import { coursesList } from "@/datas/coursesList";

import styles from "../styles/pages/courses.module.scss";

function Course() {
  return (
    <main>
      <h2>Choisis ta ou tes courses</h2>
      <section className={styles.pageWrap}>
        <CoursesList cups={coursesList} />
      </section>
    </main>
  );
}

export default Course;
