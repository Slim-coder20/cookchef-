import styles from "../footer/Footer.module.scss";

export default function Footer() {
  return (
    <footer
      className={` ${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <p>Copyright © CookChef 2025</p>
    </footer>
  );
}
