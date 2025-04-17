const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { models: { User } } = require('../models');

module.exports = {
  register: async (req, res) => {
    try {
      console.log('Registration request received:', req.body);
      const { fullname, email, password } = req.body;

      // Validate required fields
      if (!fullname || !email || !password) {
        return res.status(400).json({ 
          error: 'All fields are required',
          details: { fullname: !!fullname, email: !!email, password: !!password }
        });
      }

      // Check for existing user
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullname,
        email,
        password: hashedPassword
      });
      
      // Generate token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Send response
      return res.status(201).json({ 
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email and password are required',
          details: { email: !!email, password: !!password }
        });
      }
      
      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Generate token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Send response
      return res.json({ 
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ 
        error: 'Login failed',
        details: error.message 
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  banUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
  
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      user.isBanned = true;
      user.banReason = reason;
      await user.save();
  
      res.json({ message: `User ${user.email} has been banned`, reason });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}