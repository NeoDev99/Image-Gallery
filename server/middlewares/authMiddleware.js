const jwt = require('jsonwebtoken');

exports.authorizeToken = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return res.status(401).json({
      message: "No tokens found",
    });
  }

  try {
    const accessToken = authorizationHeader.split(" ")[1];
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = userId;
    return next();
  } catch (error) {
    res.status(401).json({
      message: "Token cannot be verified! Please check it again.",
    });
  }
};
