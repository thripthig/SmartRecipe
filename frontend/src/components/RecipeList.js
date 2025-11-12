// frontend/src/components/RecipeList.js
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onEdit, onDelete, showActions = false }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No recipes found</div>
        <p className="text-gray-400 mt-2">Start by generating some delicious recipes!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe, index) => (
        <div key={recipe._id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <RecipeCard recipe={recipe} />
          {showActions && (
            <div className="p-4 bg-gray-50 border-t flex justify-between">
              <button
                onClick={() => onEdit(recipe)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(recipe._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;