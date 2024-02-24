const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Authorization failed", success: false });
    }
    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .send({ message: "Token expired", success: false });
        }
        console.error("JWT verification error:", err);
        return res
          .status(401)
          .send({ message: "Authorization failed", success: false });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.error("Authorization middleware error:", error);
    return res
      .status(401)
      .send({ message: "Authorization failed", success: false });
  }
};
