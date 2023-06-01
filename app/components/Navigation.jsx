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
      <Link
        href="/kart"
        className={`${styles.nav__item}  ${
          pathname === "/kart" ? styles.active : ""
        }`}>
        Véhicule
      </Link>
      <Link
        href="/kartndriver"
        className={`${styles.nav__item}  ${
          pathname === "/kartndriver" ? styles.active : ""
        }`}>
        Pilote &amp; Véhicule
      </Link>
      <Link
        href="/courses"
        className={`${styles.nav__item}  ${
          pathname === "/courses" ? styles.active : ""
        }`}>
        Course
      </Link>
    </nav>
  );
}

export default Navigation;
