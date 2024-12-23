import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_RECIPE = gql`
    mutation AddRecipe($title: String!, $ingredients: [String!]!, $instructions: String!, $category: String!) {
        addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, category: $category) {
            id
            title
        }
    }
`;

const AddRecipe = () => {
    const [formData, setFormData] = useState({ title: '', ingredients: '', instructions: '', category: '' });
    const [addRecipe] = useMutation(ADD_RECIPE);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addRecipe({
            variables: {
                title: formData.title,
                ingredients: formData.ingredients.split(',').map((i) => i.trim()),
                instructions: formData.instructions,
                category: formData.category,
            },
        });
        alert('Recipe added successfully!');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-gray-100 min-h-screen flex flex-col space-y-4 max-w-lg mx-auto"
        >
            <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>
            <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="p-2 border rounded-md"
                required
            />
            <input
                type="text"
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="p-2 border rounded-md"
                required
            />
            <textarea
                placeholder="Instructions"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                className="p-2 border rounded-md"
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="p-2 border rounded-md"
                required
            />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Submit
            </button>
        </form>
    );
};

export default AddRecipe;


