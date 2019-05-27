const express = require('express');
const router  = express.Router();
const Post = require('../models/Post')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req,res,next)=>{
  const {address, text} = req.body
  const newPost = new Post ({address, text})
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
