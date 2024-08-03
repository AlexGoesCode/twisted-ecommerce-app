import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const authMiddleware = async (req, res, next) => {
  // Middleware function that checks if the user is authenticated
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret is not defined' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // Find the user by id using the decoded.sub (which is the user id)
    // and populate the likedRecipes field with the Recipe model
    const user = await User.findById({ _id: decoded.sub }).populate(
      'likedRecipes'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return 404 if user is not found
    }

    console.log('user in authMiddleware :>> ', user); // Log the user for debugging purposes
    req.user = user; // Add the user to the request object
    next(); // Call the next middleware
  } catch (err) {
    console.error('Token verification error:', err); // Log the error for debugging purposes
    res.status(401).json({ message: 'Token is not valid' }); // Return 401 if token is not valid
  }
};

export default authMiddleware;
