const { check, validationResult } = require('express-validator'); // Add express-validator
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define validation rules using express-validator
const validateSignup = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters'),
  check('email')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

module.exports = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      // Simulate express-validator's validation logic
      const req = { body: { username, email, password } };
      
      // Apply validation rules manually
      await Promise.all(validateSignup.map(validation => validation.run(req)));
      
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(errors.array().map(err => err.msg).join(', '));
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) throw new Error('User already exists');
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      
      return { username, email };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) throw new Error('Invalid credentials');
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');
      
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    },
  },
};
