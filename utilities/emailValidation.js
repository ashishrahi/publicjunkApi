
// emailValidation.js

const emailValidator = (req, res, next) => {
    const { email } = req.body; // Assuming the email is sent in the request body

    // Regular expression for validating an Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = emailValidator;
