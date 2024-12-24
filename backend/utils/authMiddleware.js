const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate users using JWT.
 * Verifies the token and attaches the user information to the request object.
 */
const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded.user;

    next();
  } catch (error) {
    console.error('JWT Verification Failed:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
