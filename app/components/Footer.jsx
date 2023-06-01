import styles from "../styles/components/footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <p>
          <span className={styles.highlight}>Disclaimer</span>&#8239;: le site
          est toujours en construction&#8239;!
        </p>
        <p>
          Pour toutes informations ou suggestions, contactez-moi sur twitter, à{" "}
          <a href="https://twitter.com/Bocnee" className={styles.link}>
            @Bocnee
          </a>
          , ou par mail à{" "}
          <a href="mailto:bocnee.aurel@gmail.com" className={styles.link}>
            bocnee.aurel@gmail.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
