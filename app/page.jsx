import Image from "next/image";

import styles from "./styles/pages/index.module.scss";

import { driverList } from "@/datas/driverList";
import RandomBtn from "./components/RandomBtn";
import ResetBtn from "./components/ResetBtn";

export default function Home() {
  return (
    <main>
      <h2>Choisis ton pilote</h2>
      <section className={styles.pageWrap}>
        <div className={styles.option}>
          <RandomBtn name="Choisis pour moi !" />
          <div>Image à afficher</div>
          <ResetBtn name="Reset" />
        </div>
        <div className={styles.driverGrid}>
          {driverList.map((driver) => (
            <div
              className={`${styles.driver}
            ${
              driver.name === "point d'interrogation"
                ? styles.unknownDriver
                : ""
            } `}
              key={driver.id}>
              <Image
                className={styles.driver__image}
                src={driver.image}
                alt={driver.name}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
