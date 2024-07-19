const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/initModels");
const User = db.User;

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while logging in the user" });
  }
};
