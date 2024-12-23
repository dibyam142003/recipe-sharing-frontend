import React, { useEffect } from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_RECIPES = gql`
    query GetRecipes {
        getRecipes {
            id
            title
            category
        }
    }
`;

const RECIPE_ADDED = gql`
    subscription RecipeAdded {
        recipeAdded {
            id
            title
            category
        }
    }
`;

const RecipeList = () => {
    const { loading, error, data, refetch } = useQuery(GET_RECIPES);
    const { data: subscriptionData } = useSubscription(RECIPE_ADDED);

    useEffect(() => {
        if (subscriptionData) {
            refetch();
        }
    }, [subscriptionData, refetch]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Recipes</h1>
            <ul className="space-y-4">
                {data.getRecipes.map((recipe) => (
                    <li key={recipe.id} className="bg-white p-4 shadow-md rounded-md">
                        <Link to={`/recipe/${recipe.id}`} className="text-blue-600 hover:underline">
                            {recipe.title}
                        </Link>
                        <p className="text-gray-500">{recipe.category}</p>
                    </li>
                ))}
            </ul>
            <Link
                to="/add-recipe"
                className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Add Recipe
            </Link>
        </div>
    );
};

export default RecipeList;

