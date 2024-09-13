const jwt = require('jsonwebtoken');
require('dotenv').config(); // Make sure to load environment variables

const { JWT_SECRET_KEY } = process.env; // Your JWT secret key from environment variables

function generateToken(admin) {
  // Define the payload
  const payload = {
    id: admin.id,
    email: admin.email,
    // Add more user info if needed
  };

  // Define options for the token
  const options = {
    expiresIn: '1h', // Token expiry time (e.g., 1 hour)
  };

  // Generate the token
  const token = jwt.sign(payload, JWT_SECRET_KEY, options);
  return token;
}

module.exports = generateToken;
