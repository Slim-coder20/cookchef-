import { data } from "./recipies";

export async function seedRecipes() {
  try {
    const response = await fetch("https://restapi.fr/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log("Données envoyées avec succès:", result);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
}
