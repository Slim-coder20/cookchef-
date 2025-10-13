import styles from "./HomePage.module.scss";
import Recipe from "./components/Recipe";
import { useState, useEffect } from "react";
import Loading from "../../components/loading/Loading";

export function HomePage() {
  const [recipes, setRecipes] = useState([]);
  // Ce state va nous permettre de mémoriser
  const [filter, setFilter] = useState("");
  // Loading
  const [isLoading, setIsLoading] = useState(true);

  //
  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch("https://restapi.fr/api/recipes");
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
  }, []);

  // Function : cette fonction va nous permettre de filtrer la recherche des recettes //
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
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
                <Recipe title={r.title} image={r.image} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
