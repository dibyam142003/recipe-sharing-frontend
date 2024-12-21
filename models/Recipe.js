const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    category: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
