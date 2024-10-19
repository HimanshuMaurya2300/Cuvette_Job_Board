const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        const AuthorizationToken = req.header('Authorization');

        if (!AuthorizationToken) {
            return res.status(401).send('Access denied. No token provided.');
        }

        const [bearer, token] = AuthorizationToken.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).send('Access denied. Invalid token format.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.companyId = decoded.companyId;

        next();  // Proceed to the next middleware
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(400).send('Invalid token.');
    }
};

module.exports = auth;
