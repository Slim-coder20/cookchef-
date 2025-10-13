import styles from './Loading.module.scss'; 
export default function Loading() {
  return (
    <div className=" d-flex flex-row align-items-center justify-content-center flex-fill">
      <i className={`fa-solid fa-spinner ${styles.spinner}`}></i>
    </div>
  );
}
