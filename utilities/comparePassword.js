// utils/authUtils.js
const bcrypt = require('bcrypt');

/**
 * Compare a plaintext password with a hashed password.
 * @param {string} plaintextPassword - The plaintext password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the passwords match, false otherwise.
 */
async function comparePasswords(plaintextPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plaintextPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
}

module.exports = {
    comparePasswords,
};
