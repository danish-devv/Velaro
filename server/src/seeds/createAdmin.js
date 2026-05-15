import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const adminExist = await userModel.findOne({
      email: "danishmr835@gmail.com",
    });
    if (adminExist) {
       console.log("admin already exist")
    return process.exit();
    }
    const salt = await bcryptjs.genSalt(10);
    const password = "51290344344";
    const hashpassword = await bcryptjs.hash(password, salt);

    await userModel.create({
      name: "Danish Ak",
      email: "danishmr835@gmail.com",
      isAdmin: true,
      password: hashpassword,
    });
    console.log("Admin is created");
    process.exit();
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
};

createAdmin()