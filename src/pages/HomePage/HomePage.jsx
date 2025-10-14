import styles from "./HomePage.module.scss";
import Recipe from "./components/Recipe";
import { useState, useEffect, useContext } from "react";
import Loading from "../../components/loading/Loading";
import { ApiContext } from "../../context/ApiContext";

export function HomePage() {
  const [recipes, setRecipes] = useState([]);
  // Ce state va nous permettre de mémoriser
  const [filter, setFilter] = useState("");
  // Loading
  const [isLoading, setIsLoading] = useState(true);

  // Context //
  const BASE_URL_API = useContext(ApiContext);

  // UseEffect : On utilise le fetch pour récupérer les données depuis l'apirest pour affichage des recettes //
  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL_API);
        if (response.ok && !cancel) {
          const recipes = await response.json();
          setRecipes(Array.isArray(recipes) ? recipes : [recipes]);
        }
      } catch (error) {
        console.log("erreur");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [BASE_URL_API]);

  // Function : cette fonction va nous permettre de filtrer la recherche des recettes //
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }

  // Function :
  function updateRecipe(updatedRecipe) {
    setRecipes(
      recipe.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  return (
    <div className="flex-fill container p-20 d-flex flex-column ">
      <h1 className=" my-30">Découvrez nos nouvelles recettes </h1>
      <div
        className={`card d-flex flex-fill flex-column mb-20 p-20 ${styles.contentCard} `}
      >
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
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r._id}
                  recipe={r}
                  toggleLikedRecipe={updateRecipe}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
