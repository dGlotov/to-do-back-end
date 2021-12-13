const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("A token is required for authentication");
    }
    
    res.locals = jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
