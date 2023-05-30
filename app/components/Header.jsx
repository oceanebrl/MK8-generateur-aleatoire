import styles from "../styles/components/header.module.scss";

import Image from "next/image";
import Navigation from "./Navigation";

import mk8Logo from "@/public/logo.png";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrap}>
        <h1 className={styles.title}>
          <Image
            src={mk8Logo}
            alt="logo du jeu Mario Kart 8 Deluxe"
            className={styles.title__logo}
          />
          Random Picker
        </h1>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
