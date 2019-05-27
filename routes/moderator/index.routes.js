const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const Post = require("../../models/Post");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 9;


/* GET home page */
router.get('/', ensureAuthenticated, (req, res, next) => {
  Post.find()
    .then(allPosts => {
      const user = req.user
      res.render('moderator/index', { post: allPosts, user: user });
    })
    .catch(error => {
      console.log(error)
    })
})

//  Middleware to check if is logged in 
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("Not logged in")
    res.redirect('/private/login')
  }
}

// login form GET
router.get("/login", (req, res, next) => {
  res.render("moderator/login", { "message": req.flash("error") });
});

// login POST
router.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/private/login",
  failureFlash: true,
  passReqToCallback: true
}));

// FORM DEL SIGNUP OCULTO PORQUE INUTIL
// router.get("/signup", (req, res, next) => {
//   res.render("private/signup");
// });

// POST del signup
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("private/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("private/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("private/signup", { message: "Something went wrong" });
      })
  });
});


// logout

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// delete post 

router.post('/:id/delete', ensureAuthenticated, (req, res, next) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then(thePost => {
      res.redirect('/private');
    })
    .catch(error => {
      console.log(error)
    })
})


module.exports = router;
