require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const Review = require("./models/review.model.js");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const {authenticateToken} = require("./utilities");
const Story = require("./models/story.model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
    if (isValidType) {
      cb(null, true);
    } else {
      cb("Only images are allowed.");
    }
  },
});


mongoose.connect(config.connectionString);

const app = express();
app.use("/uploads", express.static("uploads"));


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
      app.put("/updateUser", authenticateToken, async (req, res) => {
        try {
          const { userId } = req.user; 
          const { fullName, email } = req.body;
      
          if (!fullName && !email) {
            return res.status(400).json({ error: true, message: "Nothing to update." });
          }
      
          const updateFields = {};
          if (fullName) updateFields.fullName = fullName;
          if (email) updateFields.email = email;
      
          const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
            new: true, 
          });
      
          if (!updatedUser) {
            return res.status(404).json({ error: true, message: "User not found." });
          }
      
          return res.status(200).json({
            error: false,
            user: updatedUser,
            message: "User updated successfully.",
          });
        } catch (error) {
          console.error("Error in /updateUser route:", error); 
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });
      
      
        
      app.post("/addStory", authenticateToken, upload.single("image"), async (req, res) => {
        try {
          const { userId } = req.user; 
          const { title, content, destination } = req.body;
      
          if (!title || !content || !destination) {
            return res.status(400).json({ error: true, message: "All fields are required." });
          }
      
          const storyData = {
            userId,
            title,
            content,
            destination,
            createdAt: new Date(),
          };
      
          if (req.file) {
            storyData.image = req.file.path; 
          }
      
          const story = new Story(storyData);
          await story.save();
      
          return res.status(201).json({
            error: false,
            story,
            message: "Story added successfully.",
          });
        } catch (error) {
          console.error("Error in /addStory route:", error);
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });
      
      app.get("/getStories", async (req, res) => {
        try {
          const stories = await Story.find()
            .populate("userId", "fullName email")
            .sort({ createdAt: -1 });
      
          const formattedStories = await Promise.all(
            stories.map(async (story) => {
              const reviews = await Review.find({ storyId: story._id });
              const averageRating =
                reviews.length > 0
                  ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                  : null;
      
              return {
                _id: story._id,
                title: story.title,
                content: story.content,
                destination: story.destination,
                createdAt: story.createdAt,
                userId: story.userId,
                image: story.image ? `${req.protocol}://${req.get("host")}/${story.image}` : null,
                averageRating,
              };
            })
          );
      
          return res.status(200).json({
            error: false,
            stories: formattedStories,
            message: "Stories fetched successfully.",
          });
        } catch (error) {
          console.error("Error in /getStories route:", error);
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });
      
      app.post("/addReview", authenticateToken, async (req, res) => {
        try {
          const { itemId, itemType, rating, comment } = req.body; // إضافة itemType و itemId
          const { userId } = req.user;
      
          // التحقق من وجود itemId و rating و itemType
          if (!itemId || !rating || !itemType) {
            return res.status(400).json({ error: true, message: "Item ID, rating, and item type are required." });
          }
      
          if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: true, message: "Rating must be between 1 and 5." });
          }
      
          // إنشاء المراجعة
          const review = new Review({
            userId,
            itemId,    // المعرف الخاص بالعنصر (مثل storyId أو productId)
            itemType,  // نوع العنصر (مثل "story" أو "product")
            rating,
            comment,
          });
      
          await review.save();
      
          return res.status(201).json({
            error: false,
            review,
            message: "Review added successfully.",
          });
        } catch (error) {
          console.error("Error in /addReview route:", error);
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });
      
      app.get("/getReviews/:itemId", async (req, res) => {
        try {
          const { itemId } = req.params; // جلب itemId من الـ URL
      
          // جلب المراجعات بناءً على itemId
          const reviews = await Review.find({ itemId })
            .populate("userId", "fullName email") // جلب بيانات المستخدم (مثل الاسم والبريد الإلكتروني)
            .sort({ createdAt: -1 }); // ترتيب المراجعات من الأحدث إلى الأقدم
      
          return res.status(200).json({
            error: false,
            reviews,
            message: "Reviews fetched successfully.",
          });
        } catch (error) {
          console.error("Error in /getReviews route:", error);
          return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
      });
      
app.get("/getStories/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId).populate("userId", "fullName email");

    if (!story) {
      return res.status(404).json({ error: true, message: "Story not found" });
    }

    return res.status(200).json({
      error: false,
      story,
      message: "Story fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching story details:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});



      

      
      
      app.listen(5000);
      module.exports = app