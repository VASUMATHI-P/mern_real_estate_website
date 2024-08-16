import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  const {username, email, password} = req.body;
  const newUser = new User({
    username,
    email,
    password: bcryptjs.hashSync(password, 10)
  })

  try {
    await newUser.save();
    const {pass: password, ...rest} = newUser._doc;
    res.status(201).json(rest);
  } catch (err){
    res.status(500).send('Error creating user');
  }
}