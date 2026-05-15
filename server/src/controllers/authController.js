import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      const error = new Error("User already exist");
      res.status(409);
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
    const userRegisterd = await userModel.findOne({ email });
    if (!userRegisterd) {
      const error = new Error("User not found");
      res.status(404);
      return next(error);
    }
    const passwordCheck = await bcryptjs.compare(
      password,
      userRegisterd.password,
    );

    if (!passwordCheck) {
      const error = new Error("Invalid credentials");
      res.status(401);
      return next(error);
    }
    const jwt_secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: userRegisterd._id, isAdmin: userRegisterd.isAdmin },
      jwt_secret,
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "you login successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export { registerUser, loginUser };
