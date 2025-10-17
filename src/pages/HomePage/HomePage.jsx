import styles from "./HomePage.module.scss";
import Recipe from "./components/recipe/Recipe";
import { useState, useEffect, useContext } from "react";
import Loading from "../../components/loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import Search from "./components/search/Search";
import useFetchData from "../../hooks/useFetchData";

/**
 * Composant principal de la page d'accueil - Container Component
 * Gère toute la logique métier et les appels HTTP (GET, PATCH, DELETE)
 * Transmet les données et callbacks aux composants de présentation
 * @returns {JSX.Element} Le composant HomePage
 */
function HomePage() {
  // État pour gérer le filtre de recherche des recettes
  const [filter, setFilter] = useState("");

  // État pour gérer la pagination des recettes
  const [page, setPage] = useState(1);

  // Récupération de l'URL de base de l'API depuis le contexte
  const BASE_URL_API = useContext(ApiContext);

  // Utilisation du hook personnalisé pour récupérer les données des recettes
  // Le hook retourne les données, l'état de chargement et les erreurs
  const [[recipes, setRecipes], isLoading, error] = useFetchData(
    BASE_URL_API,
    page
  );

  /**
   * Gère la mise à jour d'une recette via API PATCH
   * Envoie la requête HTTP et met à jour l'état local en cas de succès
   * @param {Object} updatedRecipe - La recette avec les nouvelles données à envoyer à l'API
   */
  async function updateRecipe(updatedRecipe) {
    try {
      // Envoie une requête PATCH pour mettre à jour la recette sur le serveur
      const { _id, ...restRecipe } = updatedRecipe;
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restRecipe),
      });

      // Si la requête s'est bien passée
      if (response.ok) {
        const updatedFromApi = await response.json();
        // Met à jour l'état local
        setRecipes(
          recipes.map((r) =>
            r._id === updatedFromApi._id ? updatedFromApi : r
          )
        );
      }
    } catch (e) {
      console.log("Erreur");
    }
  }

  /**
   * Gère la suppression d'une recette via API DELETE
   * Envoie la requête HTTP et met à jour l'état local en cas de succès
   * @param {string} _id - L'identifiant unique de la recette à supprimer
   */
  async function deleteRecipe(_id) {
    try {
      // Envoie une requête DELETE pour supprimer la recette
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "DELETE",
      });

      // Si la suppression s'est bien passée
      if (response.ok) {
        // Met à jour l'état local en supprimant la recette
        setRecipes(recipes.filter((r) => r._id !== _id));
      }
    } catch (e) {
      console.log("Erreur");
    }
  }

  return (
    <div className="flex-fill container p-20 d-flex flex-column ">
      {/* En-tête avec le titre et le nombre total de recettes */}
      <h1 className=" my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}> - {recipes.length}</small>
      </h1>

      {/* Conteneur principal avec la barre de recherche et la liste des recettes */}
      <div
        className={`card d-flex flex-fill flex-column mb-20 p-20 ${styles.contentCard} `}
      >
        {/* Composant de recherche permettant de filtrer les recettes */}
        <Search setFilter={setFilter} />

        {/* Affichage conditionnel : loading initial ou liste des recettes */}
        {isLoading && !recipes.length ? (
          // Affiche le composant de chargement uniquement lors du premier chargement
          <Loading />
        ) : (
          // Grille des recettes avec filtrage par titre
          <div className={styles.grid}>
            {recipes
              // Filtrage des recettes selon le critère de recherche (débute par le filtre tapé)
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              // Rendu de chaque recette dans le composant de présentation Recipe
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  updatedRecipe={updateRecipe}
                  deleteRecipe={deleteRecipe}
                />
              ))}
          </div>
        )}

        {/* Bouton pour charger plus de recettes (pagination) */}
        <div className="d-flex flex-row justify-content-center align-items-center p-20">
          <button
            onClick={() => setPage(page + 1)}
            className=" btn btn-primary"
          >
            Charger plus de recettes
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
