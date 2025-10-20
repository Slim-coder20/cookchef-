import React from "react";
import styles from "./AdminNav.module.scss";
import { NavLink } from "react-router-dom";

export default function AdminNav() {
  return (
    <ul className={`d-flex flex-column ${styles.list}`}>
      <NavLink to="recipes">Recette</NavLink>
      <NavLink to="users">Utilisateurs</NavLink>
    </ul>
  );
}
