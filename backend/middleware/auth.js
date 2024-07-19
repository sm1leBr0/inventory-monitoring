const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized!" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Require Admin Role!" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
