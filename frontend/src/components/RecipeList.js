// frontend/src/components/RecipeList.js
import React from 'react';
// RecipeCard import is removed as we only show the title and action buttons here

const RecipeList = ({ recipes, onSelect, onEdit, onDelete, showActions = false }) => {
    // Ensure onSelect is included in the destructured props
    
    if (!recipes || recipes.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No recipes found</div>
                <p className="text-gray-400 mt-2">Start by generating some delicious recipes!</p>
            </div>
        );
    }

    // Changed layout from grid to vertical list (`space-y-4`)
    return (
        <div className="space-y-4">
            {recipes.map((recipe, index) => (
                <div 
                    key={recipe._id || index} 
                    // Card structure for list item: shows title and actions side-by-side
                    className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex justify-between items-center transition duration-200 hover:shadow-lg"
                >
                    {/* Display only the name/title of the recipe */}
                    <h2 className="text-xl font-semibold text-orange-800 truncate pr-4">
                        {recipe.title}
                    </h2>
                    
                    {showActions && (
                        <div className="flex space-x-2 flex-shrink-0">
                            {/* NEW VIEW BUTTON: Triggers the onSelect prop */}
                            <button
                                onClick={() => onSelect(recipe)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition"
                            >
                                View
                            </button>
                            
                            {/* EXISTING EDIT BUTTON */}
                            <button
                                onClick={() => onEdit(recipe)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition"
                            >
                                Edit
                            </button>
                            
                            {/* EXISTING DELETE BUTTON */}
                            <button
                                onClick={() => onDelete(recipe._id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
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