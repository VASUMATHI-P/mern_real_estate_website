import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.send('Hello, World!');
}

export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) {
    return res.status(403).send('You do not have permission to update this user.');
  }

  try {
    if(req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      }, { new: true}
    );
    const {password: pass, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err){
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id){
    return res.status(403).send('You do not have permission to delete this user.');
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User deleted successfully!');
  } catch(err) {
    next(err);
  }
}

export const getUserListings = async (req, res, next) => {
  if(req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only view your own listings'))
  }

  try {
    const listings = await Listing.find({userRef : req.user.id});
    res.status(200).json(listings);
  } catch(err){
    next(err);
  }
}