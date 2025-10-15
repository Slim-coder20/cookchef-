import styles from "./HomePage.module.scss";
import Recipe from "./components/recipe/Recipe";
import { useState, useEffect, useContext } from "react";
import Loading from "../../components/loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import Search from "./components/search/Search";
import useFetchData from "../../hooks/useFetchData";

/**
 * Composant principal de la page d'accueil affichant la liste des recettes
 * @returns {JSX.Element} Le composant HomePage
 */
export function HomePage() {
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
   * Fonction pour mettre à jour une recette spécifique dans la liste
   * @param {Object} updatedRecipe - La recette mise à jour avec ses nouvelles données
   */
  function updateRecipe(updatedRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
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
              // Rendu de chaque recette dans le composant Recipe
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  toggleLikedRecipe={updateRecipe}
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
