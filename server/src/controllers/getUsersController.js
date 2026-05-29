import usermodel from "../models/user.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await usermodel
      .find()
      .select("name email isAdmin createdAt updatedAt");

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllUsers;
