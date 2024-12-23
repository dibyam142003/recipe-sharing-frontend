import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const REGISTER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            id
            username
            email
            token
        }
    }
`;

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [register] = useMutation(REGISTER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await register({ variables: formData });
        localStorage.setItem('token', data.register.token);
        alert('Registered successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
