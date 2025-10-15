import styles from "./HeaderMenu.module.scss";

export default function HeaderMenu({setPage}) {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>Wishlist</li>
      <li onClick={() => setPage('admin')}>Ajouter une recette</li>
      <li>Connexion</li>
    </ul>
  );
}
