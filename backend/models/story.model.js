const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  destination: { type: String, required: true },
  image: { type: String, required: false }, 
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Story", StorySchema);
