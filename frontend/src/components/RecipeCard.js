// frontend/src/components/RecipeCard.js
import React from 'react';
import { formatPreparationTime, formatNutritionalInfo } from '../utils/apiHelpers';
import { categorizeIngredients } from '../utils/recipeUtils';

const RecipeCard = ({ recipe, onSave, canSave }) => {
  const { title, ingredients, instructions, preparationTime, nutritionalInfo, chefTips } = recipe;
  
  const categorizedIngredients = categorizeIngredients(ingredients);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden recipe-card">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-orange-800">{title}</h2>
          {canSave && (
            <button
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Save Recipe
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ingredients Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
            
            {/* Original Ingredients */}
            {categorizedIngredients.original.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">What you have:</h4>
                <ul className="space-y-2">
                  {categorizedIngredients.original.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-800">
                      <span className="ingredient-tag px-2 py-1 rounded text-sm">
                        {ingredient.name}
                      </span>
                      <span className="text-sm text-gray-500">({ingredient.quantity})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Suggested Ingredients */}
            {categorizedIngredients.suggested.length > 0 && (
              <div>
                <h4 className="font-medium text-green-700 mb-2">Suggested additions:</h4>
                <ul className="space-y-2">
                  {categorizedIngredients.suggested.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2 text-green-600">
                      <span>{ingredient.name}</span>
                      <span className="text-sm text-gray-500">({ingredient.quantity})</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Suggested
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recipe Info */}
          <div>
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Recipe Info</h4>
              <p className="text-gray-600">
                Preparation Time: {formatPreparationTime(preparationTime)}
              </p>
              {nutritionalInfo && (
                <div className="mt-2 nutrition-badge p-2 rounded">
                  <p className="text-sm text-gray-600">
                    {formatNutritionalInfo(nutritionalInfo)}
                  </p>
                </div>
              )}
            </div>

            {chefTips && chefTips.length > 0 && (
              <div className="chef-tip p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Chef's Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  {chefTips.map((tip, index) => (
                    <li key={index} className="text-sm">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h3>
          <ol className="space-y-3">
            {instructions.map((step, index) => (
              <li key={index} className="recipe-step">
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;