// frontend/src/pages/RecipeGenerator.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { validateRecipeForm } from '../utils/validation';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';

const RecipeGenerator = () => {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState([]);
  const [inputType, setInputType] = useState('text');
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRecipe = async () => {
    // Validate input
    const validation = validateRecipeForm({
      ingredients,
      title: 'temp',
      instructions: ['temp'],
      preparationTime: 30
    });
    
    if (!validation.isValid) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const recipeData = await authService.generateRecipe(ingredients, inputType);
      setGeneratedRecipe(recipeData);
    } catch (err) {
      setError(err.message || 'Failed to generate recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user) {
      setError('Please log in to save recipes');
      return;
    }

    try {
      await authService.saveRecipe({
        ...generatedRecipe,
        inputType,
        originalIngredients: ingredients
      });
      alert('Recipe saved successfully!');
    } catch (err) {
      setError('Failed to save recipe: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-8 slide-in-right">
          AI Recipe Generator
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 recipe-card">
          <IngredientInput
            ingredients={ingredients}
            setIngredients={setIngredients}
            inputType={inputType}
            setInputType={setInputType}
          />
          
          <div className="text-center mt-6">
            <button
              onClick={handleGenerateRecipe}
              disabled={loading || ingredients.length === 0}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 pulse-glow"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  Generating Recipe...
                </div>
              ) : (
                'Generate Recipe'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded fade-in">
              {error}
            </div>
          )}
        </div>

        {generatedRecipe && (
          <div className="bounce-in">
            <RecipeCard
              recipe={generatedRecipe}
              onSave={handleSaveRecipe}
              canSave={!!user}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;