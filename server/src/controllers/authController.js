import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({
        message: "user already exist",
      });
    }

    const salt =await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
    });
    res.status(201).json({
      message: "user created successfuly",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

const loginUser=async (req,res)=>{
    try {
        const { email, password } = req.body;
        const userRegisterd = await userModel.findOne({ email });
        if (!userRegisterd) {
          return res.status(404).json({
            message: "user not found",
          });
        }
        const passwordCheck =await bcryptjs.compare(
          password,
          userRegisterd.password,
        );

        if (!passwordCheck) {
        return  res.status(401).json({
            message: "invalid credentials",
          });
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
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }


}



 export {registerUser,loginUser}