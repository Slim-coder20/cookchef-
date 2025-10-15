import styles from "../header/Header.module.scss";
import cookchef from "../../assets/images/cookchef.png";
import { useState } from "react";
import HeaderMenu from "../headerMenu/HeaderMenu";

export default function Header({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`d-flex flex-row align-items  ${styles.header}`}>
      <div className="flex-fill">
        <img
          onClick={() => setPage("homepage")}
          src={cookchef}
          alt="logo cookchef"
        />
      </div>
      <ul className={styles.headerList}>
        <button
          onClick={() => setPage("admin")}
          className="mr-5 btn btn-primary"
        >
          Ajouter une recette{" "}
        </button>
        <button className="mr-5 btn btn-reverse-primary">
          <i className="fa-solid fa-heart mr-5"></i>
          <span>Wishlist</span>
        </button>
        <button className="mr-5 btn btn  btn-primary">connexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu setPage={setPage} />
        </>
      )}
    </header>
  );
}
