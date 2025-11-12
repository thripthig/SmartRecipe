// frontend/src/components/IngredientInput.js
import React, { useState } from 'react';

const IngredientInput = ({ ingredients, setIngredients, inputType, setInputType }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div>
      {/* Input Type Selector */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setInputType('text')}
          className={`px-4 py-2 rounded-lg ${
            inputType === 'text'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Text Input
        </button>
        <button
          onClick={() => setInputType('image')}
          className={`px-4 py-2 rounded-lg ${
            inputType === 'image'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Image Upload
        </button>
      </div>

      {inputType === 'text' ? (
        <div>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an ingredient (e.g., chicken, tomatoes)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={addIngredient}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Ingredients List */}
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>{ingredient}</span>
                <button
                  onClick={() => removeIngredient(index)}
                  className="text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600 mb-4">Image upload feature coming soon!</p>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;