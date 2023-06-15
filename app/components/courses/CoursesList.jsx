"use client";
import Image from "next/image";
import styles from "../../styles/components/courses/coursesList.module.scss";

function CoursesList({ cups }) {
  return (
    <section className={styles.coursesWrap}>
      {cups.map((cup) => (
        <div key={cup.id} className={styles.cup}>
          <div className={styles.cup__logo}>
            <Image
              src={cup.image}
              alt={cup.name}
              title={cup.name}
              priority={true}
              className={styles.cup__logo__img}
            />
          </div>
          {cup.courses.map((course) => (
            <div key={course.id} className={styles.cup__courses}>
              <Image
                src={course.image}
                alt={course.name}
                title={course.name}
                priority={true}
                className={styles.cup__courses__img}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default CoursesList;
