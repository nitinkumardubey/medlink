const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt for user:', username);
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      console.warn('Login failed for user:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed! ' });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

module.exports = { login, profile };
