import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";




const  signup = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;

    // password security
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.",
      });
    }



    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash,role });
    await user.save();

    // console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: user._id, email: user.email,role:user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });
   
    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email,role:user.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

  
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email,role:user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email,role:user.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export default { signup, login};