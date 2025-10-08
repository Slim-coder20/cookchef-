import styles from "./Recipe.module.scss";
import { useState } from "react";

type Props = {
  title: string;
  image: string;
};

export default function Recipe({ title, image }: Props) {
  // State : ce state va nous permettre de mémoriser le liked sur une recette // 
  const [liked, setLiked ] = useState(false)

  // Function : cette fonction va nous permettre de déclencher le liked sur les recettes // 
  function handleClick () {
   setLiked(!liked); 
  }

  return (
    <div onClick={ handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{title}</h3>
        <i
          className={`fa-solid fa-heart m-10 ${liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}
