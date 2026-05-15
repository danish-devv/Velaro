const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
      return  next()
    }else{
      return  res.status(403).json({
            message:"Not authroized as admin"
        })
    }
};

export default isAdmin