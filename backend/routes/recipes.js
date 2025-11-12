// backend/routes/recipes.js
const express = require('express');
const auth = require('../middleware/auth');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Get user's recipes
router.get('/my-recipes', auth, async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
});

// Save recipe
router.post('/', auth, async (req, res) => {
    try {
        const recipeData = {
            ...req.body,
            userId: req.userId
        };

        const recipe = new Recipe(recipeData);
        await recipe.save();

        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save recipe' });
    }
});

// Update recipe
router.put('/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, userId: req.userId });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        Object.assign(recipe, req.body);
        await recipe.save();

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update recipe' });
    }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete recipe' });
    }
});

// 👈 FIX: Export the router instance
module.exports = router;