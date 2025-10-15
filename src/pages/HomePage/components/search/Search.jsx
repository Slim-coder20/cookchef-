import React from "react";
import styles from "./Search.module.scss";

export default function Search({ setFilter }) {
  // Function : cette fonction va nous permettre de filtrer la recherche des recettes //
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }
  return (
    // Barre de recherche
    <div
      className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input
        onInput={handleInput}
        className=" flex-fill"
        type="text"
        placeholder="rechercher"
      />
    </div>
  );
}
