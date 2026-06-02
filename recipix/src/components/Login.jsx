import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User as UserIcon, LogIn, AlertCircle, CheckCircle } from 'lucide-react';

const USERS_KEY = 'recipix_registered_users';

// Secure Password Hashing using native Web Crypto API (SHA-256)
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Input fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // Reset error/success when toggling mode
  useEffect(() => {
    setError('');
    setSuccess('');
  }, [isSignUp]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Common validations
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      triggerShake();
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      triggerShake();
      return;
    }

    // Load registered users from local storage
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    if (isSignUp) {
      // SIGN UP FLOW
      if (!name.trim()) {
        setError('Please enter your name.');
        triggerShake();
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        triggerShake();
        return;
      }

      // Check if email already registered
      const userExists = storedUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError('An account with this email already exists.');
        triggerShake();
        return;
      }

      try {
        const passwordHash = await hashPassword(password);
        const newUser = {
          name: name.trim(),
          email: email.toLowerCase(),
          passwordHash
        };

        storedUsers.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(storedUsers));

        setSuccess('Account created successfully! Logging you in...');
        
        // Log user in automatically after 1.5s
        setTimeout(() => {
          onLogin({ email: newUser.email, name: newUser.name });
          navigate('/');
        }, 1500);

      } catch (err) {
        console.error('Hashing failed:', err);
        setError('An unexpected error occurred. Please try again.');
        triggerShake();
      }
    } else {
      // LOGIN FLOW
      const matchedUser = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!matchedUser) {
        setError('Invalid email or password.');
        triggerShake();
        return;
      }

      try {
        const passwordHash = await hashPassword(password);
        
        if (matchedUser.passwordHash === passwordHash) {
          onLogin({ email: matchedUser.email, name: matchedUser.name });
          navigate('/');
        } else {
          setError('Invalid email or password.');
          triggerShake();
        }
      } catch (err) {
        console.error('Login failed:', err);
        setError('An unexpected error occurred. Please try again.');
        triggerShake();
      }
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Image of a Kitchen with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 filter blur-sm"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-charcoal-dark/30 z-5" />

      {/* Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={shake ? { x: [-10, 10, -10, 10, -5, 5, -2, 2, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={shake ? { duration: 0.5 } : { type: "spring", stiffness: 260, damping: 20 }}
        className="relative z-10 w-full max-w-md bg-white-pure/75 backdrop-blur-xl border border-white-pure/40 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-charcoal-dark mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-charcoal-medium">
            {isSignUp ? 'Sign up to start saving and sharing recipes' : 'Log in to save recipes and share reviews'}
          </p>
        </div>

        <form onSubmit={handleAction} className="space-y-5">
          {/* Name Field (Sign Up Only) */}
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Your Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sreethu"
                    className="w-full pl-12 pr-4 py-3 bg-white-pure/60 border border-sage-medium/35 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-dark/50 focus:border-sage-dark transition text-charcoal-dark placeholder-charcoal-light/60 text-sm"
                    required={isSignUp}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-white-pure/60 border border-sage-medium/35 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-dark/50 focus:border-sage-dark transition text-charcoal-dark placeholder-charcoal-light/60 text-sm"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-white-pure/60 border border-sage-medium/35 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-dark/50 focus:border-sage-dark transition text-charcoal-dark placeholder-charcoal-light/60 text-sm"
                required
              />
            </div>
          </div>

          {/* Confirm Password Field (Sign Up Only) */}
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-white-pure/60 border border-sage-medium/35 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-dark/50 focus:border-sage-dark transition text-charcoal-dark placeholder-charcoal-light/60 text-sm"
                    required={isSignUp}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-medium"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-sage-dark hover:bg-sage-dark/90 text-white-pure font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <LogIn className="w-5 h-5" />
            <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
          </button>
        </form>

        {/* View Toggle */}
        <div className="mt-6 text-center text-xs text-charcoal-light">
          <span>{isSignUp ? 'Already have an account? ' : "Don't have an account? "}</span>
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold text-sage-dark hover:underline bg-transparent border-0 cursor-pointer"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
