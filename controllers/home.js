const router = require("express").Router();
const { User, Post, Comment } = require("../models");


// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((data) => {
      const posts= data.map((post)=> post.get({plain:true}));
      res.render("all-posts", {posts})
    })
    .catch((err) => res.status(500).json(err));
});

//TODO:
//NEED ROUT FOR POST BY ID
//Get.findOne

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post= postData.get({plain: true});
      res.render('singlePost', {post})
    } else {
      res.status(404).end();
    }
  } catch(err) {
    res.status(500).end(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
