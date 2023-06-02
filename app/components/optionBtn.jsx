import styles from "../styles/components/optionBtn.module.scss";

function OptionBtn({ name, btnFunction }) {
  return (
    <button className={styles.btn} onClick={btnFunction}>
      <span className={styles.pinkShell}></span>
      {name}
    </button>
  );
}

export default OptionBtn;
