import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const getUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Login User
const loginUser = async (req, res) => {


  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email }).select("+password");


    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        phone: user.phone,
        city: user.city,
        state: user.state
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Register User
const registerUser = async (req, res) => {

  // res.json({msg: "register API working"})
  // console.log(req.body);



  try {
    const { name, email, password, nickname, phone, city, state } = req.body;



    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      nickname,
      phone,
      city,
      state
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        phone: user.phone,
        city: user.city,
        state: user.state
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export { loginUser, registerUser, getUser };
