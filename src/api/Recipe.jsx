// URL de base de l'API pour les recettes
const RECIPE_API = "https://restapi.fr/api/recipes";

/**
 * Récupère une liste de recettes depuis l'API
 * @param {string} queryParam - Paramètres de requête optionnels (ex: "page=1&limit=10")
 * @returns {Promise<Array>} - Tableau des recettes récupérées
 * @throws {Error} - Erreur si la requête échoue
 */
export async function getRecipes(queryParam) {
  // Construction de l'URL avec les paramètres de requête si fournis
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );

  // Vérification du succès de la requête
  if (response.ok) {
    const body = await response.json();
    // S'assurer que la réponse est toujours un tableau
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch recipes");
  }
}

/**
 * Récupère une recette spécifique par son identifiant
 * @param {string} _id - L'identifiant unique de la recette à récupérer
 * @returns {Promise<Object>} - L'objet recette récupéré
 * @throws {Error} - Erreur si la requête échoue
 */
export async function getRecipe(_id) {
  // Requête GET vers l'endpoint spécifique de la recette
  const response = await fetch(`${RECIPE_API}/${_id}`);

  // Vérification du succès de la requête
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error fetch recipe");
  }
}

/**
 * Supprime une recette par son identifiant
 * @param {string} _id - L'identifiant unique de la recette à supprimer
 * @returns {Promise<string>} - L'identifiant de la recette supprimée
 * @throws {Error} - Erreur si la requête échoue
 */
export async function deleteRecipe(_id) {
  // Requête DELETE vers l'endpoint spécifique de la recette
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "DELETE",
  });

  // Vérification du succès de la requête
  if (response.ok) {
    return _id; // Retourne l'ID pour confirmation de suppression
  } else {
    throw new Error("Error delete recipe");
  }
}
/**
 * Met à jour une recette existante
 * @param {Object} updatedRecipe - L'objet recette avec les nouvelles données (doit contenir _id)
 * @returns {Promise<Object>} - La recette mise à jour retournée par l'API
 * @throws {Error} - Erreur si la requête échoue
 */
export async function updateRecipe(updatedRecipe) {
  // Extraction de l'ID et des autres propriétés de la recette
  const { _id, ...restRecipe } = updatedRecipe;

  // Requête PATCH vers l'endpoint spécifique de la recette
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRecipe), // Envoi des données sans l'ID
  });

  // Vérification du succès de la requête
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update recipe");
  }
}
/**
 * Crée une nouvelle recette
 * @param {Object} newRecipe - L'objet recette à créer (sans _id)
 * @returns {Promise<Object>} - La nouvelle recette créée retournée par l'API
 * @throws {Error} - Erreur si la requête échoue
 */
export async function createRecipe(newRecipe) {
  // Requête POST vers l'endpoint de base des recettes
  const response = await fetch(RECIPE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe), // Envoi des données de la nouvelle recette
  });

  // Vérification du succès de la requête
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create recipe");
  }
}
