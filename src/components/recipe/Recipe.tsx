import styles from "./Recipe.module.scss";

type Props = {
  title: string;
  image: string;
};

export default function Recipe({ title, image }: Props) {
  return (
    <div className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-row justify-content-center align-items-center`}
      >
        <h3>{title}</h3>
      </div>
    </div>
  );
}
