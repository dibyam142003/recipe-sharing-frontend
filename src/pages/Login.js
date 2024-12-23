import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            username
            token
        }
    }
`;

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await login({ variables: formData });
        localStorage.setItem('token', data.login.token);
        alert('Logged in successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
