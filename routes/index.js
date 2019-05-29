const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
const csvFilePath = ('./bin/gender_development_indexG.csv')
const csv = require('csvtojson')


router.get("/erjason", (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.json(jsonObj);
    })
})
/**
 * [
 * 	{a:"1", b:"2", c:"3"},
 * 	{a:"4", b:"5". c:"6"}
 * ]
 */


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/chart', (req, res, next) => {
  res.render('chart');
});

//POST MODEL FROM FORM INPUTS AND REDIRECT INDEX

router.post('/', (req, res, next) => {
  const { location, text } = req.body
  console.log(location)
  const newPost = new Post({ location, text })
  newPost.save()
    .then(
      res.redirect('/')
    )
    .catch(error => {
      console.log(error)
    })
})

// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
  Post.find({}, (error, allPosts) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ posts: allPosts });
    }
  });
});


// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/api/:id', (req, res, next) => {
  let placeId = req.params.id
  Post.findOne({ _id: placeId }, (error, onePostFromDB) => {
    if (error) {
      next(error)
    } else {
      res.status(200).json({ restaurant: onePostFromDB })
    }
  })
})



module.exports = router;
