import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "not authorized,login first",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
   return res.status(401).json({
      message: "unauthorized",
      error: error.message,
    });
  }
};




export default protect