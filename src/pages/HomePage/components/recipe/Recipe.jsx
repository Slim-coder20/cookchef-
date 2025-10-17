import styles from "./Recipe.module.scss";

/**
 * Composant Recipe - Affiche une recette avec la possibilité de l'aimer et de la supprimer
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.recipe - L'objet recette contenant les informations
 * @param {string} props.recipe.title - Le titre de la recette
 * @param {string} props.recipe.image - L'URL de l'image de la recette
 * @param {boolean} props.recipe.liked - État d'aimer la recette (true/false)
 * @param {string} props.recipe._id - L'identifiant unique de la recette
 * @param {Function} props.toggleLikedRecipe - Fonction pour basculer l'état "aimé" d'une recette
 * @param {Function} props.deleteRecipe - Fonction pour supprimer une recette
 */
function Recipe({ recipe, updatedRecipe, deleteRecipe }) {
  // Récupération de l'URL de base de l'API depuis le contexte
 
  const { _id, title, image, liked } = recipe;

  /**
   * Gère le clic sur la recette pour basculer l'état "aimé"
   * Envoie une requête PATCH à l'API pour mettre à jour l'état
   */
  function handleClick() {
    updatedRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  /**
   * Gère le clic sur l'icône de suppression
   * @param {Event} e - L'événement de clic
   */
  async function handleClickDelete(e) {
    // Empêche la propagation de l'événement pour éviter de déclencher handleClick
    e.stopPropagation();
    deleteRecipe(recipe._id)
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
        <i className={`fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
