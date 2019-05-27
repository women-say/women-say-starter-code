const express = require('express');
const router = express.Router();
const Post = require("../models/Post");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.post('/', (req, res, next) => {
  const { address, text } = req.body
  const newPost = new Post({ address, text })
  newPost.save()
    .then(
      res.redirect("/")
    )
    .catch(error => {
      console.log(error)
    })
})



module.exports = router;
