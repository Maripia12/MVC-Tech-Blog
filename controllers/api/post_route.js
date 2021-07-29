const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../utils/auth");
const { route } = require("./user_route");

//Create route for Post 

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
