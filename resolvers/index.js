const { PubSub } = require('graphql-subscriptions');
const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const authMiddleware = require('../utils/authMiddleware');

const pubsub = new PubSub(); // Create a PubSub instance

const resolvers = {
    Query: {
        // Public resolver: No middleware required
        getRecipes: async () => await Recipe.find().populate('createdBy'),

        // Public resolver: No middleware required
        getRecipeById: async (_, { id }) => await Recipe.findById(id).populate('createdBy'),
    },

    Mutation: {
        // Protected resolver: Add a new recipe
        addRecipe: async (_, { title, ingredients, instructions, category }, context) => {
            const user = authMiddleware(context); // Authenticate the user
            const newRecipe = new Recipe({
                title,
                ingredients,
                instructions,
                category,
                createdBy: user.id, // Use authenticated user's ID
            });

            await newRecipe.save();
            pubsub.publish('RECIPE_ADDED', { recipeAdded: newRecipe }); // Publish the event
            return newRecipe;
        },

        // Protected resolver: Add a new review for a recipe
        addReview: async (_, { recipeId, content, rating }, context) => {
            const user = authMiddleware(context); // Authenticate the user
            const newReview = new Review({
                recipe: recipeId,
                content,
                rating,
                user: user.id, // Use authenticated user's ID
            });

            await newReview.save();
            pubsub.publish(`REVIEW_ADDED_${recipeId}`, { reviewAdded: newReview }); // Publish the event
            return newReview;
        },
    },

    Subscription: {
        // Subscription for new recipes
        recipeAdded: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('RECIPE_ADDED'),
        },

        // Subscription for new reviews on a specific recipe
        reviewAdded: {
            subscribe: (_, { recipeId }, { pubsub }) => pubsub.asyncIterator(`REVIEW_ADDED_${recipeId}`),
        },
    },
};

module.exports = resolvers;



