"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "../styles/components/navigation.module.scss";

function Navigation() {
  // vérifier le nom du chemin
  let pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        className={`${styles.nav__item}  ${
          pathname === "/" ? styles.active : ""
        }`}>
        Pilote
      </Link>
      <div className={styles.nav__item}>Véhicule</div>
      <div className={styles.nav__item}>Pilote &amp; Véhicule</div>
      <div className={styles.nav__item}>Course</div>
    </nav>
  );
}

export default Navigation;
