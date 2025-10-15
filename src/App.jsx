import Header from "./components/header/Header";
import Admin from "./pages/admin/Admin";
import { HomePage } from "./pages/HomePage/HomePage";
import { useState } from "react";
import Footer from "./components/footer/Footer";
import styles from "./App.module.scss";
// import { seedRecipes } from "./data/seed";

//  seedRecipes();
function App() {
  // State
  const [page, setPage] = useState("homepage");

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header setPage={setPage} />
      {page === "homepage" && <HomePage />}
      {page === "admin" && <Admin />}
      <Footer />
    </div>
  );
}

export default App;
