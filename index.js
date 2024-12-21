const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const pubsub = new PubSub();

const startServer = async () => {
    const app = express();

    // MongoDB Connection
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // WebSocket Server
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    useServer({ schema }, wsServer);

    // Apollo Server
    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ req, pubsub }),
    });
    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen(4000, () => {
        console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:4000${server.graphqlPath}`);
    });
};

startServer();


