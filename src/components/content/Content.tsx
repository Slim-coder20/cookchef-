import styles from "./Content.module.scss";
import Recipe from "../recipe/Recipe";
import { data } from "../../data/recipies";
import type { Recipe as RecipeType } from "../../data/recipies";
import { useState } from "react";

export default function Content() {
  const recipes: RecipeType[] = data;
  // Ce state va nous permettre de mémoriser
  const [filter, setFilter] = useState("");

  // Function : cette fonction va nous permettre de filtrer la recherche des recettes // 
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  return (
    <div className="flex-fill container p-20">
      <h1 className=" my-30">Découvrez nos nouvelles recettes </h1>
      <div className={`card d-flex flex-column  p-20 ${styles.contentCard} `}>
        {/* Barre de recherche  */}
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
        <div className={styles.grid}>
          {recipes
            .filter((r) => r.title.toLowerCase().startsWith(filter))
            .map((r) => (
              <Recipe key={r._id} title={r.title} image={r.image} />
            ))}
        </div>
      </div>
    </div>
  );
}
