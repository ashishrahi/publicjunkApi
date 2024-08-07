const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Secret key for signing and verifying JWT tokens (should be stored securely)
const JWT_SECRET = process.env.JWT_SECRET_KEY;

//////////////// Middleware to verify JWT token ///////////////////////

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token.' });
            }
            req.auth = { user: decoded }; 
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided.' });
    }
}

///////////////////////// generating a JWT token /////////////////////////

function generateToken(user) {
    return jwt.sign({ username: 1234,pasword:1234 }, JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
}

module.exports = authenticateJWT;