import jwt from 'jsonwebtoken'; // generates token
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'; // hash password
import passwordEncryption from '../utils/passwordServices.js';
import { imageUpload } from '../utils/imageUpload.js';

// Helper function to handle errors
const handleError = (res, message, status = 500) => {
  return res.status(status).json({ message });
};

export const registerUser = async (req, res) => {
  console.log('req.body :>> ', req.body);
  console.log('req.file :>> ', req.file);

  try {
    const user = await User.findOne({ email: req.body.email }); // check if user exists, by email
    console.log('user :>> ', user);
    if (user) {
      return handleError(res, 'User already exists', 400);
    }

    const hashedPassword = await passwordEncryption(req.body.password); // if user does not exist, hash the password
    if (!hashedPassword) {
      return handleError(res, 'Server error hashing password');
    }

    // upload file to cloudinary by calling the imageUpload function
    const avatar = await imageUpload(req.file, 'user-avatars');
    console.log('avatar :>> ', avatar);

    const newUser = new User({
      // create a new user with following properties
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      avatar: avatar,
    });
    const savedUser = await newUser.save();

    // generate the token with the user id, and include the token in the response.
    const token = jwt.sign({ sub: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser,
      token,
    });
  } catch (error) {
    console.log('Registration error :>> ', error);
    handleError(res, 'Server error');
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and populate the likedItems array
    const user = await User.findOne({ email }).populate('likedItems');
    if (!user) {
      return handleError(res, 'User not found', 404);
    }

    // Compare the password from the request with the hashed password from the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return handleError(res, 'Password is incorrect', 404);
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('token :>> ', token);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.name,
        avatar: user.avatar,
        likedItems: user.likedItems,
      },
      token,
    });
  } catch (error) {
    console.log('Login error :>> ', error);
    handleError(res, 'Server error');
  }
};

export const testAuth = async (req, res) => {
  // test the auth middleware
  console.log('testing auth');
  console.log('req.file :>> ', req.file);
};

export const uploadAvatar = async (req, res) => {
  console.log('req.file :>> ', req.file);
  try {
    if (!req.user || !req.user._id) {
      return handleError(res, 'Unauthorized: No user ID found', 401);
    }

    const userId = req.user._id; // extract user ID from the request

    const avatar = await imageUpload(req.file, 'user-avatars');
    console.log('avatar :>> ', avatar);

    if (!avatar) {
      return handleError(res, 'Failed to upload avatar');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    console.log('user :>> ', user);

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
    });
  } catch (error) {
    console.log('Error uploading avatar :>> ', error);
    handleError(res, 'Failed to upload avatar');
  }
};

export const getUserProfile = async (req, res) => {
  console.log('req.user controller :>> ', req.user);
  if (!req.user) {
    return handleError(res, 'No token, authorization denied', 401);
  }

  res.status(200).json({
    message: 'User profile retrieved successfully',
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.name,
      avatar: req.user.avatar,
      likedItems: req.user.likedItems,
    },
  });
};
