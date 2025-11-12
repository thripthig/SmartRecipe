// frontend/src/utils/recipeUtils.js
export const categorizeIngredients = (ingredients) => {
  const categorized = {
    original: [],
    suggested: []
  };
  
  ingredients.forEach(ingredient => {
    if (ingredient.original) {
      categorized.original.push(ingredient);
    } else {
      categorized.suggested.push(ingredient);
    }
  });
  
  return categorized;
};

export const calculateNutritionScore = (nutrition) => {
  if (!nutrition) return 0;
  
  let score = 0;
  const { calories, protein, carbs, fat } = nutrition;
  
  // Simple scoring algorithm (you can customize this)
  if (calories < 400) score += 2;
  else if (calories < 600) score += 1;
  
  const proteinG = parseInt(protein) || 0;
  if (proteinG > 20) score += 2;
  else if (proteinG > 10) score += 1;
  
  return Math.min(score, 5); // Max score of 5
};

export const generateShoppingList = (ingredients) => {
  return ingredients.map(ingredient => ({
    item: ingredient.name,
    quantity: ingredient.quantity,
    checked: false
  }));
};

export const formatInstructions = (instructions) => {
  return instructions.map((instruction, index) => ({
    step: index + 1,
    text: instruction,
    time: null // You could add estimated time per step
  }));
};

export const filterRecipes = (recipes, filters) => {
  return recipes.filter(recipe => {
    if (filters.maxTime && recipe.preparationTime > filters.maxTime) {
      return false;
    }
    
    if (filters.maxCalories && recipe.nutritionalInfo?.calories > filters.maxCalories) {
      return false;
    }
    
    if (filters.ingredients && filters.ingredients.length > 0) {
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      const hasAllIngredients = filters.ingredients.every(ing => 
        recipeIngredients.includes(ing.toLowerCase())
      );
      if (!hasAllIngredients) return false;
    }
    
    return true;
  });
};