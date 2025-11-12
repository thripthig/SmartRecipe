// frontend/src/pages/MyRecipes.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import RecipeList from '../components/RecipeList';

const MyRecipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const userRecipes = await authService.getMyRecipes();
      setRecipes(userRecipes);
    } catch (err) {
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await authService.deleteRecipe(recipeId);
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
      } catch (err) {
        setError('Failed to delete recipe');
      }
    }
  };

  const handleEditRecipe = (recipe) => {
    // Implement edit functionality
    alert('Edit functionality coming soon!');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-orange-800 mb-4">My Recipes</h1>
        <p className="text-gray-600">Please log in to view your saved recipes.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center">
        My Saved Recipes
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Loading your recipes...</div>
        </div>
      ) : (
        <RecipeList
          recipes={recipes}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
          showActions={true}
        />
      )}
    </div>
  );
};

export default MyRecipes;