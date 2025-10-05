const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log('User role:', req.user ? req.user.role : 'No user');
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = authorizeRoles;
