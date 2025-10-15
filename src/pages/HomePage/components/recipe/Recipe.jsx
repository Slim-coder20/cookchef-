import { useContext } from "react";
import { ApiContext } from "../../../../context/ApiContext";
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
function Recipe({
  recipe: { title, image, liked, _id },
  toggleLikedRecipe,
  deleteRecipe,
}) {
  // Récupération de l'URL de base de l'API depuis le contexte
  const BASE_URL_API = useContext(ApiContext);

  /**
   * Gère le clic sur la recette pour basculer l'état "aimé"
   * Envoie une requête PATCH à l'API pour mettre à jour l'état
   */
  async function handleClick() {
    try {
      // Envoie une requête PATCH pour inverser l'état "liked"
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liked: !liked, // Inverse l'état actuel (true devient false et vice versa)
        }),
      });

      // Si la requête s'est bien passée
      if (response.ok) {
        const updatedRecipe = await response.json();
        // Met à jour l'état local via la fonction passée en props
        toggleLikedRecipe(updatedRecipe);
      }
    } catch (e) {
      console.log("Erreur");
    }
  }

  /**
   * Gère le clic sur l'icône de suppression
   * @param {Event} e - L'événement de clic
   */
  async function handleClickDelete(e) {
    // Empêche la propagation de l'événement pour éviter de déclencher handleClick
    e.stopPropagation();

    try {
      // Envoie une requête DELETE pour supprimer la recette
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "DELETE",
      });

      // Si la suppression s'est bien passée
      if (response.ok) {
        // Met à jour l'état local en supprimant la recette
        deleteRecipe(_id);
      }
    } catch (e) {
      console.log("Erreur");
    }
  }

  return (
    <div onClick={handleClick} className={styles.recipe}>
      {/* Icône de suppression en haut à droite */}
      <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>

      {/* Conteneur pour l'image de la recette */}
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>

      {/* Section titre avec l'icône de coeur */}
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        {/* Titre de la recette */}
        <h3 className="mb-10">{title}</h3>
        {/* Icône de coeur qui change de couleur selon l'état "liked" */}
        <i className={`fa-solid fa-heart ${liked ? "text-primary" : ""}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
