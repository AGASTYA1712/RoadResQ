const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { full_name, email, phone, password } = req.body;

  if (!full_name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [full_name, email, phone, hashedPassword], (err, result) => {
      if (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Register Catch Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      console.error("Login DB Error:", err);
      return res.status(500).json({ message: err.message });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "roadresq_secret_key",
        { expiresIn: "7d" }
      );

      res.json({
        message: "Login successful",
        token,
        user,
      });
    } catch (error) {
      console.error("Login Catch Error:", error);
      return res.status(500).json({ message: error.message });
    }
  });
};