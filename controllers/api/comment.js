
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
// const withAuth = require("../utils/auth");

//Create route for Comment


//CREATE A POST ROUTE


router.post("/",  (req, res) => {
  Comment.create({
    title:req.body.title, 
    date_created: req.body.date_created,
    content: req.body.content,
  })
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      res.status(500).json(err);
    });
});




















module.exports = router;