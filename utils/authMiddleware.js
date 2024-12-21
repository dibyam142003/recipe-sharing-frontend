const jwt = require('jsonwebtoken');

const authMiddleware = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user; // Return the decoded user information
            } catch (err) {
                throw new Error('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be in the format: Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
};

module.exports = authMiddleware;
