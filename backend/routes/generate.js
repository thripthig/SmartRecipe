// backend/routes/generate.js
const express = require('express');
const auth = require('../middleware/auth');
const GeminiRecipeGenerator = require('../utils/geminiAI');
const router = express.Router();

router.post('/recipe', auth, async (req, res) => {
    try {
        const { ingredients, inputType } = req.body;
        
        if (!ingredients || !Array.isArray(ingredients)) {
            return res.status(400).json({ message: 'Ingredients array is required' });
        }

        let recipeData;
        
        if (inputType === 'text') {
            recipeData = await GeminiRecipeGenerator.generateRecipeFromText(ingredients);
        } else if (inputType === 'image') {
            // Handle image input
            recipeData = await GeminiRecipeGenerator.generateRecipeFromImage(ingredients);
        } else {
            return res.status(400).json({ message: 'Invalid input type' });
        }

        res.json(recipeData);
    } catch (error) {
        console.error('Recipe generation error:', error);
        res.status(500).json({ message: error.message || 'Failed to generate recipe' });
    }
});

// ✅ FIX: Export the router instance
module.exports = router;