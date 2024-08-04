import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  testAuth,
  uploadAvatar,
  getUserProfile,
} from '../controller/userController.js';
import { multerUpload } from '../middleware/multer.js';

const router = express.Router();

// Define the routes for the API
router.post('/register', multerUpload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.post(
  '/upload-avatar',
  authMiddleware,
  multerUpload,
  uploadAvatar.single('avatar'),
  uploadAvatar
);
// router.get('/likes', authMiddleware, getUserLikes); //* activate for likes functionality
router.get('/profile', authMiddleware, getUserProfile);
router.get('/testAuth', authMiddleware, testAuth);

export default router;
