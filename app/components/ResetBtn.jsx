import styles from "../styles/components/randomBtn.module.scss";

function ResetBtn({ name }) {
  return <button className={styles.btn}>{name}</button>;
}

export default ResetBtn;
