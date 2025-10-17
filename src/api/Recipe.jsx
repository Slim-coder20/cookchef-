const RECIPE_API = "https://restapi.fr/api/recipes";

export async function getRecipes(queryParam) {
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch recipes");
  }
}

export async function getRecipe(_id) {
  const response = await fetch(`${RECIPE_API}/${_id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error fetch recipe");
  }
}

export async function deleteRecipes(_id) {}
export async function updateRecipes(updatedRecipe) {}
export async function createRecipes(newRecipe) {}
