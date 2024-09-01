import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

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