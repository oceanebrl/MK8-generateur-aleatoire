import styles from "../styles/components/footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <p>
          <span className={styles.highlight}>Disclaimer</span>&#8239;: Site créé
          par une fan, pour des fans.&#8239;!
        </p>
        <p>
          Pour toutes informations ou suggestions, contactez-moi par mail à{" "}
          <a href="mailto:oceanebrl.94@gmail.com" className={styles.link}>
            oceanebrl.94@gmail.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
