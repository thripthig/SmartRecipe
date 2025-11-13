// frontend/src/components/RecipeView.js (MODIFIED TO WRAP RECIPECARD)

import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard'; // <-- IMPORT RECIPECARD

// Removed all utility functions (formatIngredient, highlightInstructionKeywords) 
// as RecipeCard handles the display logic internally.

const RecipeView = ({ recipe, onBack }) => {
    if (!recipe) return null;

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in max-w-6xl">
            
            {/* Back Button */}
            <button
                onClick={onBack}
                className="mb-8 bg-white hover:bg-gray-50 text-orange-600 border border-orange-300 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center shadow-sm hover:shadow-md"
            >
                <span className="mr-2 text-lg">&larr;</span> Back to My Recipes
            </button>

            {/* Recipe Content: Use the RecipeCard UI structure */}
            {/* We pass the recipe object directly to RecipeCard. */}
            {/* We set canSave to false because this is a saved view, not the generator view. */}
            <RecipeCard
                recipe={recipe}
                canSave={false} 
                // onSave is not needed here as we are just viewing a saved item
                onSave={() => {}} 
            />
            
            {/* Footer */}
            <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm">
                    Enjoy your cooking! 🍽️
                </p>
            </div>
        </div>
    );
};

RecipeView.propTypes = {
    recipe: PropTypes.object,
    onBack: PropTypes.func.isRequired,
};

export default RecipeView;