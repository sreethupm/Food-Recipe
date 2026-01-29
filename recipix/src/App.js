import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes'); 
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <Router>
      <Nav setSearch={setSearch} recipes={recipes} />


      <Routes>



        <Route
          path="/"
          element={
            <>
              <Home />
              <RecipeList recipes={recipes} search={search} />

            </>
          }
        />
        <Route
          path="/recipes"
          element={<RecipeList recipes={recipes} search={search} />}
        />
        <Route
          path="/recipes/:id"
          element={<Recipe recipes={recipes} />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;