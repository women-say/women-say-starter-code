const mongoose = require('mongoose');
const Post = require("../models/Post")
const dbName = 'women-say-starter-code'
mongoose.connect(`mongodb://localhost/${dbName}`);

const posts = [
  {
    location: "Madrid, Spain",
    text: "My collegue stalks me everytime I get out of work.",
  },
  {
    location: "Orlando, United States",
    text: "My main manager touches my butt in every occasion he can",
  },
  {
    location: "Turin, Italy",
    text: "I work in a group with another male collegue. We got hired the same day for the same job. Different paychecks.",
  },
]

Post.create(posts)
  .then(celCreated => {
    console.log(`Created ${celCreated.length} posts`)
    mongoose.connection.close()
  })
  .catch(err => console.log(`Omg an error: ${err}`))
