import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, X, LogOut, User, Menu, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Nav({ setSearch, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearch(value);

    if (location.pathname !== '/recipes' && !location.pathname.startsWith('/recipes/')) {
      navigate('/recipes');
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  const confirmLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/recipes', label: 'Menu' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/services', label: 'Services' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white-pure/75 backdrop-blur-md border-b border-sage-light/35 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-sage-medium/10 flex items-center justify-center border border-sage-medium/20">
              <ChefHat className="w-6 h-6 text-sage-dark" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-charcoal-dark hidden sm:inline-block">
              Recipix
            </span>
          </Link>

          {/* Search Box - Centered */}
          <div className="flex-grow max-w-md mx-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-charcoal-light/75 pointer-events-none" />
              <input
                type="text"
                placeholder="Search recipes, cuisines..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full pl-11 pr-10 py-2.5 bg-sage-light/20 hover:bg-sage-light/30 focus:bg-white-pure border border-sage-medium/15 focus:border-sage-dark focus:outline-none focus:ring-1 focus:ring-sage-dark rounded-full text-sm text-charcoal-dark transition-all placeholder-charcoal-light/60"
              />
              {searchInput && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 p-1 rounded-full hover:bg-sage-light/40 text-charcoal-light transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = 
                link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive 
                      ? 'text-sage-dark font-semibold' 
                      : 'text-charcoal-medium hover:text-sage-dark'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-dark rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Button */}
          <div className="hidden sm:flex items-center gap-4 shrink-0 font-medium text-sm">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-sage-light/30 text-sage-dark rounded-full">
                  <User className="w-4 h-4" />
                  <span className="font-semibold text-xs">{user.name}</span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-1.5 text-charcoal-medium hover:text-red-500 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 bg-charcoal-dark text-white-pure hover:bg-sage-dark rounded-full shadow-sm hover:shadow transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-sage-light/20 text-charcoal-dark transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sage-light/20 bg-white-pure py-4 px-6 space-y-4 shadow-lg">
            <div className="flex flex-col gap-3 font-medium text-sm">
              {navLinks.map((link) => {
                const isActive = 
                  link.path === '/' 
                    ? location.pathname === '/' 
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-sage-light/30 text-sage-dark font-semibold' 
                        : 'text-charcoal-medium hover:bg-sage-light/10 hover:text-sage-dark'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-sage-light/20 flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-sage-dark" />
                    <span className="text-charcoal-dark font-medium text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-1.5 text-red-500 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-charcoal-dark text-white-pure rounded-xl hover:bg-sage-dark transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* CUSTOM LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/45 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="w-full max-w-sm bg-white-pure border border-sage-medium/15 rounded-3xl p-6 shadow-2xl text-center space-y-5"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <LogOut className="w-5 h-5" />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-charcoal-dark">Confirm Log Out</h4>
                <p className="text-xs text-charcoal-medium leading-relaxed">
                  Are you sure you want to log out? You will need to sign in again to save recipes or post reviews.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 py-2.5 border border-charcoal-dark/10 hover:bg-charcoal-dark/5 text-charcoal-medium font-semibold text-xs rounded-full transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white-pure font-semibold text-xs rounded-full shadow transition cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
