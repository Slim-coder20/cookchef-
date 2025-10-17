import styles from "./Recipe.module.scss";

/**
 * Composant de présentation Recipe - Presentational Component
 * Affiche une recette et délègue toute la logique métier au composant parent
 * Ne contient aucune logique HTTP, seulement l'affichage et les événements UI
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.recipe - L'objet recette contenant les informations
 * @param {string} props.recipe.title - Le titre de la recette
 * @param {string} props.recipe.image - L'URL de l'image de la recette
 * @param {boolean} props.recipe.liked - État d'aimer la recette (true/false)
 * @param {string} props.recipe._id - L'identifiant unique de la recette
 * @param {Function} props.updatedRecipe - Callback pour mettre à jour une recette (géré par le parent)
 * @param {Function} props.deleteRecipe - Callback pour supprimer une recette (géré par le parent)
 */
function Recipe({ recipe, updatedRecipe, deleteRecipe }) {
  // Récupération de l'URL de base de l'API depuis le contexte

  const { _id, title, image, liked } = recipe;

  /**
   * Gère le clic sur la recette pour basculer l'état "aimé"
   * Délègue la logique de mise à jour au composant parent via le callback
   */
  function handleClick() {
    updatedRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  /**
   * Gère le clic sur l'icône de suppression
   * Délègue la logique de suppression au composant parent via le callback
   * @param {Event} e - L'événement de clic
   */
  async function handleClickDelete(e) {
    // Délègue la suppression au composant parent qui gère la requête HTTP
    e.stopPropagation();
    deleteRecipe(recipe._id);
  }

  return (
    <div onClick={handleClick} className={styles.recipe}>
      {/* Icône de suppression en haut à droite */}
      <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>

      {/* Conteneur pour l'image de la recette */}
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt={title} />
      </div>

      {/* Section titre avec l'icône de coeur */}
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        {/* Titre de la recette */}
        <h3 className="mb-10">{recipe.title}</h3>
        {/* Icône de coeur qui change de couleur selon l'état "liked" */}
        <i
          className={`fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
