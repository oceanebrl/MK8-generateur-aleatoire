import Image from "next/image";

import styles from "../../styles/components/courses/coursesList.module.scss";
import pickedStyle from "../../styles/modules/pickedStyle.module.scss";

import checkMark from "@/public/check.png";

function CoursesList({ cups, isCoursePicked, selectCourse }) {
  return (
    <section className={styles.coursesWrap} draggable="none">
      {cups.map((cup) => (
        <div key={cup.id} className={styles.cup}>
          <div className={styles.cup__logo}>
            <Image
              src={cup.image}
              alt={cup.name}
              title={cup.name}
              priority={true}
              className={styles.cup__logo__img}
              draggable="none"
            />
          </div>
          {cup.courses.map((course) => (
            <div
              onClick={() => selectCourse(course)}
              key={course.id}
              className={`${styles.cup__courses} ${pickedStyle.item}`}>
              <div className={styles.cup__courses__name}>
                <p>{course.name}</p>
              </div>
              {isCoursePicked(course) && (
                <Image
                  src={checkMark}
                  className={`${pickedStyle.item__check} ${styles.check}`}
                  alt="Coche"
                />
              )}
              <Image
                src={course.image}
                alt={course.name}
                title={course.name}
                priority={true}
                className={`${styles.cup__courses__img} ${
                  pickedStyle.item__image
                } ${
                  isCoursePicked(course)
                    ? `${pickedStyle.picked} ${styles.picked}`
                    : ""
                }`}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default CoursesList;
