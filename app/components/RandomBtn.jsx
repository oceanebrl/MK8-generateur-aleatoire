import styles from "../styles/components/randomBtn.module.scss";

function RandomBtn({ name }) {
  return (
    <button className={styles.btn}>
      <span className={styles.pinkShell}></span>
      {name}
    </button>
  );
}

export default RandomBtn;
