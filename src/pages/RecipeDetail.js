import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription, gql } from '@apollo/client';

const GET_RECIPE_BY_ID = gql`
    query GetRecipeById($id: ID!) {
        getRecipeById(id: $id) {
            title
            ingredients
            instructions
            category
            reviews {
                content
                rating
            }
        }
    }
`;

const REVIEW_ADDED = gql`
    subscription ReviewAdded($recipeId: ID!) {
        reviewAdded(recipeId: $recipeId) {
            content
            rating
        }
    }
`;

const RecipeDetail = () => {
    const { id } = useParams();
    const { loading, error, data, refetch } = useQuery(GET_RECIPE_BY_ID, { variables: { id } });
    const { data: subscriptionData } = useSubscription(REVIEW_ADDED, { variables: { recipeId: id } });

    useEffect(() => {
        if (subscriptionData) {
            refetch();
        }
    }, [subscriptionData, refetch]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    const { title, ingredients, instructions, category, reviews } = data.getRecipeById;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-500 mb-4">Category: {category}</p>
            <h2 className="text-xl font-semibold">Ingredients:</h2>
            <ul className="list-disc ml-6 mb-4">
                {ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold">Instructions:</h2>
            <p className="mb-4">{instructions}</p>
            <h2 className="text-xl font-semibold">Reviews:</h2>
            <ul className="space-y-2">
                {reviews.map((review, index) => (
                    <li key={index} className="bg-white p-4 shadow-md rounded-md">
                        <p>{review.content}</p>
                        <p className="text-gray-500">Rating: {review.rating} stars</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetail;


