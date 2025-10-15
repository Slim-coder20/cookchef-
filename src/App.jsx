import Header from "./components/header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import Footer from "./components/footer/Footer";
import styles from "./App.module.scss";
// import { seedRecipes } from "./data/seed";

//  seedRecipes();
function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
