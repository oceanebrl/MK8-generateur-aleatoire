import React from "react";
import Image from "next/image";

import styles from "../styles/components/modal.module.scss";
import btn from "../styles/components/optionBtn.module.scss";

function Modal({
  btnFunctionReset,
  btnFunctionClose,
  modalImg,
  modalImgAlt,
  title,
  children,
}) {
  const handleAsideClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.page} onClick={btnFunctionClose}>
      <aside className={styles.modal} onClick={handleAsideClick}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.wrap}>
          <div className={styles.paragraph}>{children}</div>
          <Image src={modalImg} alt={modalImgAlt} className={styles.img} />
        </div>
        <div className={styles.btnWrap}>
          <button className={btn.btn} onClick={btnFunctionReset}>
            Réinitialiser
          </button>
          <button className={btn.btn} onClick={btnFunctionClose}>
            Fermer
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Modal;
