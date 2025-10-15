import React from "react";
import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour récupérer des données depuis une API REST
 * @param {string} url - L'URL de l'endpoint API à appeler
 * @param {number} page - Le numéro de page pour la pagination (optionnel)
 * @returns {Array} [data, setData] - Les données et la fonction de mise à jour, isLoading - état de chargement, error - erreur éventuelle
 */
export default function useFetchData(url, page) {
  // État pour stocker les données récupérées depuis l'API
  const [data, setData] = useState([]);

  // État pour gérer l'affichage du chargement
  const [isLoading, setIsLoading] = useState(true);

  // État pour gérer les erreurs potentielles
  const [error, setError] = useState(null);

  // Effect pour déclencher la récupération des données à chaque changement d'URL ou de page
  useEffect(() => {
    // Si aucune URL n'est fournie, on ne fait rien
    if (!url) return;

    // Variable pour annuler la requête si le composant est démonté
    let cancel = false;

    /**
     * Fonction asynchrone pour récupérer les données depuis l'API
     */
    async function fetchData() {
      try {
        // Activation de l'état de chargement
        setIsLoading(true);

        // Construction des paramètres de requête pour la pagination
        const queryParam = new URLSearchParams();
        if (page) {
          // Calcul du nombre d'éléments à ignorer (skip) et limite par page
          queryParam.append("skip", (page - 1) * 18);
          queryParam.append("limit", 18);
        }

        // Appel à l'API avec les paramètres de pagination
        const response = await fetch(url + `?${queryParam}`);

        // Si la réponse est OK et que le composant n'a pas été démonté
        if (response.ok && !cancel) {
          const newData = await response.json();

          // Mise à jour des données : concaténation si c'est un tableau, ajout sinon
          setData((x) =>
            Array.isArray(newData) ? [...x, ...newData] : [...x, newData]
          );
        }
      } catch (error) {
        // Gestion des erreurs : affichage d'un message générique
        setError("Erreur");
      } finally {
        // Désactivation du chargement si le composant est toujours monté
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }

    // Exécution de la fonction de récupération des données
    fetchData();

    // Fonction de nettoyage pour annuler la requête si le composant est démonté
    return () => (cancel = true);
  }, [url, page]); // Déclenchement à chaque changement d'URL ou de page

  // Retour des états et fonctions nécessaires aux composants utilisateurs
  return [[data, setData], isLoading, error];
}
