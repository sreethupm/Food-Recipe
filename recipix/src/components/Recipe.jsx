import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, RotateCcw, Clock, Award, Users } from 'lucide-react';

function Recipe({ recipes, activeId, onClose }) {
  const recipe = recipes.find(r => r.id === activeId);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(0);
  
  // Checklist state
  const [checkedIngredients, setCheckedIngredients] = useState({});

  if (!recipe) return null;

  const totalSteps = recipe.instructions.length;

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResetStepper = () => {
    setCurrentStep(0);
  };

  // Framer Motion Variants for Staggered Ingredients List
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 200, damping: 18 } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden bg-charcoal-dark/45 backdrop-blur-md"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Layered Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative z-10 w-full h-full md:h-auto md:max-h-[90vh] max-w-6xl bg-white-pure rounded-none md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 bg-white-pure/80 backdrop-blur-md hover:bg-white-pure text-charcoal-dark border border-sage-medium/20 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Hero Image & Ingredients Checklist */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-sage-light/35 overflow-y-auto">
          {/* Shared Element Image Header */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] w-full shrink-0 overflow-hidden bg-charcoal-dark">
            <motion.img 
              layoutId={`recipe-image-${recipe.id}`}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-transparent" />
            
            {/* Quick Meta */}
            <div className="absolute bottom-6 left-6 right-6 text-white-pure">
              <h2 className="font-serif text-3xl font-black mb-2 tracking-tight">{recipe.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sage-light">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{recipe.prepTimeMinutes + recipe.cookTimeMinutes} Mins</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Serves {recipe.servings}</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" />{recipe.cuisine}</span>
              </div>
            </div>
          </div>

          {/* Checklist Area */}
          <div className="p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-dark">Ingredients</h3>
              <p className="text-xs text-charcoal-light mt-1">Tap items to check them off as you cook</p>
            </div>

            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3 font-sans"
            >
              {recipe.ingredients.map((item, i) => {
                const isChecked = !!checkedIngredients[i];
                return (
                  <motion.li 
                    key={i} 
                    variants={itemVariants}
                    onClick={() => toggleIngredient(i)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    {/* Checkbox Graphic */}
                    <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all duration-200 ${
                      isChecked 
                        ? 'bg-sage-dark border-sage-dark text-white-pure' 
                        : 'border-sage-medium/40 group-hover:border-sage-dark/60 bg-sage-light/10'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    {/* Ingredient Text */}
                    <span className={`text-sm leading-relaxed transition-all duration-200 select-none ${
                      isChecked 
                        ? 'line-through text-charcoal-light/50' 
                        : 'text-charcoal-medium group-hover:text-charcoal-dark'
                    }`}>
                      {item}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Cooking Directions Stepper */}
        <div className="w-full md:w-1/2 flex flex-col bg-white-warm overflow-y-auto p-8 justify-between">
          <div className="my-auto space-y-8 py-6">
            {/* Progress Header */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-sage-dark">
                <span>Cooking Steps</span>
                <span>{currentStep + 1} of {totalSteps}</span>
              </div>
              <div className="w-full h-1.5 bg-sage-light/45 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sage-dark transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-sage-medium/10 text-sage-dark rounded-lg text-xs font-bold uppercase tracking-wider">
                Step {currentStep + 1}
              </span>
              <motion.p 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="font-serif text-lg sm:text-xl text-charcoal-dark leading-relaxed font-medium min-h-[120px]"
              >
                {recipe.instructions[currentStep]}
              </motion.p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-sage-light/35 pt-6 shrink-0 mt-8">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border border-charcoal-dark/10 font-semibold text-xs transition cursor-pointer ${
                currentStep === 0 
                  ? 'opacity-40 cursor-not-allowed text-charcoal-light' 
                  : 'hover:bg-charcoal-dark/5 text-charcoal-medium hover:border-charcoal-medium'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep === totalSteps - 1 ? (
              <button
                onClick={handleResetStepper}
                className="flex items-center gap-2 px-5 py-2.5 bg-sage-dark hover:bg-sage-dark/90 text-white-pure font-semibold text-xs rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start Over</span>
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-5 py-2.5 bg-charcoal-dark hover:bg-sage-dark text-white-pure font-semibold text-xs rounded-full shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Recipe;
