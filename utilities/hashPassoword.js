const bcrypt = require('bcrypt');

// Define the number of salt rounds for bcrypt
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

module.exports = { hashPassword };
