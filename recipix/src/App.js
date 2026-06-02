import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Footer from './components/Footer';
import Login from './components/Login';

function AppContent() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

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

  // Detect recipe detail view from path
  const recipeIdMatch = location.pathname.match(/^\/recipes\/(\d+)$/);
  const activeRecipeId = recipeIdMatch ? Number(recipeIdMatch[1]) : null;

  // Use a stable key for background transitions to avoid unmounting/resetting scroll
  // when opening a recipe details overlay
  const getRouteKey = (loc) => {
    if (loc.pathname.startsWith('/recipes')) {
      return '/recipes';
    }
    return loc.pathname;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white-warm text-charcoal-dark selection:bg-sage-medium/30">
      <Nav setSearch={setSearch} recipes={recipes} user={user} onLogout={() => setUser(null)} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={getRouteKey(location)}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                  <RecipeList recipes={recipes} search={search} />
                </motion.div>
              }
            />
            <Route
              path="/recipes"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <h1 className="text-4xl font-serif font-bold text-charcoal-dark mb-4 text-center">
                      Our Culinary Collection
                    </h1>
                    <p className="text-charcoal-medium text-center max-w-xl mx-auto mb-12">
                      Explore fresh ingredients, seasonal inspirations, and curated recipes perfect for any occasion.
                    </p>
                  </div>
                  <RecipeList recipes={recipes} search={search} />
                </motion.div>
              }
            />
            <Route
              path="/recipes/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <h1 className="text-4xl font-serif font-bold text-charcoal-dark mb-4 text-center">
                      Our Culinary Collection
                    </h1>
                    <p className="text-charcoal-medium text-center max-w-xl mx-auto mb-12">
                      Explore fresh ingredients, seasonal inspirations, and curated recipes perfect for any occasion.
                    </p>
                  </div>
                  <RecipeList recipes={recipes} search={search} />
                </motion.div>
              }
            />
            <Route
              path="/services"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Services />
                </motion.div>
              }
            />
            <Route
              path="/reviews"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Reviews user={user} />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-20"
                >
                  <Login onLogin={setUser} />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Recipe Detail Overlay (Shared Element Transition) */}
      <AnimatePresence>
        {activeRecipeId && (
          <Recipe 
            recipes={recipes} 
            activeId={activeRecipeId} 
            onClose={() => navigate('/recipes')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent />
    </Router>
  );
}

export default App;