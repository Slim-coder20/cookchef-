import styles from "./HomePage.module.scss";
import Recipe from "./components/recipe/Recipe";
import { useState, useEffect, useContext } from "react";
import Loading from "../../components/loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import Search from "./components/search/Search";

export function HomePage() {
  const [recipes, setRecipes] = useState([]);
  // Ce state va nous permettre de mémoriser
  const [filter, setFilter] = useState("");
  // Loading
  const [isLoading, setIsLoading] = useState(true);

  // Context //
  const BASE_URL_API = useContext(ApiContext);

  const [page, setPage] = useState(1);

  // UseEffect : On utilise le fetch pour récupérer les données depuis l'apirest pour affichage des recettes //
  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL_API}?skip=${(page - 1) * 18}&limit=18`
        );
        if (response.ok && !cancel) {
          const newRecipes = await response.json();
          setRecipes((x) =>
            Array.isArray(newRecipes)
              ? [...x, ...newRecipes]
              : [...x, newRecipes]
          );
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
  }, [BASE_URL_API, page]);

  // Function :
  function updateRecipe(updatedRecipe) {
    setRecipes(
      recipe.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  return (
    <div className="flex-fill container p-20 d-flex flex-column ">
      <h1 className=" my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}> - {recipes.length}</small>
      </h1>
      <div
        className={`card d-flex flex-fill flex-column mb-20 p-20 ${styles.contentCard} `}
      >
        <Search setFilter={setFilter} />
        {isLoading && !recipes.length ? (
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
