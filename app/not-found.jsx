import Link from "next/link";
import Image from "next/image";

import styles from "./styles/pages/404.module.scss";

import lakitu from "@/public/illustrations/lakitu_yoshi_new_island.png";

function notFound() {
  return (
    <main className={styles.wrap}>
      <div>
        <h2 className={styles.title}>404</h2>
        <p className={styles.paragraph}>
          Il semblerait qu&apos;en voulant prendre ton raccourcis, tu es tombé
          dans le vide.
        </p>
        <p className={styles.paragraph}>
          Pour que Lakitu te ramène en lieu sûr, tu peux cliquer{" "}
          <Link href="/" className={styles.paragraph__link}>
            ici
          </Link>
          .
        </p>
      </div>
      <Image
        className={styles.image}
        src={lakitu}
        alt="Lakitu, du jeu yoshi new island, tenant une canne à pêche"
      />
    </main>
  );
}

export default notFound;
