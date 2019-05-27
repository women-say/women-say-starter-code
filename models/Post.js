const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  text:String,
},{timestamps:true})

//aquí cosas de localización??

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
