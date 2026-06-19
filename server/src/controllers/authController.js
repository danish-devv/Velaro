import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      const error = new Error("User already exist");
      error.statusCode=409;
      return next(error);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
    });
    res.status(201).json({
      message: "User created successfuly",
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userRegisterd = await userModel.findOne({ email }).select("+password");
    if (!userRegisterd) {
      const error = new Error("User not found");
      error.statusCode=404;
      return next(error);
    }
    const passwordCheck = await bcryptjs.compare(
      password,
      userRegisterd.password,
    );

    if (!passwordCheck) {
      const error = new Error("Invalid credentials");
      error.statusCode=401;
      return next(error);
    }
    const jwt_secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: userRegisterd._id, isAdmin: userRegisterd.isAdmin },
      jwt_secret,
    );

    
const user={
  id: userRegisterd._id,
    name: userRegisterd.name,
    email: userRegisterd.email,
    isAdmin: userRegisterd.isAdmin
}
res.cookie("token",token)
    res.status(200).json({
      message: "you login successfully",
      user,
      token
    });
  } catch (error) {
    return next(error);
  }
};

export { registerUser, loginUser };
