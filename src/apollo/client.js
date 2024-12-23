import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Replace with your backend URL
    cache: new InMemoryCache(),
});

export default client;
