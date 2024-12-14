require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const {authenticateToken} = require("./utilities");

mongoose.connect(config.connectionString);

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({origin: "*",}));

    app.post("/createaccount", async (req, res) => {
        try {
          const { fullName, email, password } = req.body;
          if (!fullName || !email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required." });
          }
      
          const isUser = await User.findOne({ email });
          if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists." });
          }
      
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({ fullName, email, password: hashedPassword });
          await user.save();
      
          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
          );
      
          return res.status(201).json({
            error: false,
            user: { fullName: user.fullName, email: user.email },
            accessToken,
            message: "User created successfully.",
          });
        } catch (error) {
          console.error("Error in /createaccount route:", error); 
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });

      app.post("/login", async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required." });
          }
      
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).json({ error: true, message: "User not found." });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ error: true, message: "Invalid credentials." });
          }
      
          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
          );
      
          return res.status(200).json({
            error: false,
            user: { fullName: user.fullName, email: user.email },
            accessToken,
            message: "Login successful.",
          });
        } catch (error) {
          console.error("Error in /login route:", error); 
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });

      app.get("/getUser", authenticateToken, async (req, res) => {
        try {
          const { userId } = req.user;
      
          const isUser = await User.findOne({ _id: userId });
      
          if (!isUser) {
            return res.status(401).json({ message: "User not authorized" });
          }
      
          return res.json({
            user: isUser,
            message: "User found successfully",
          });
        } catch (error) {
          console.error("Error fetching user:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
        
      });
      
      
      app.listen(3000);
      module.exports = app