const router = require("express").Router();
const { Model } = require("sequelize/types");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const { get } = require("./api");

// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
        include:[User]
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render("all.posts", {
      posts
      // // Pass the logged in flag to the template
     
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//TODO:
 //NEED ROUT FOR POST BY ID
//Get.findOne

router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const [postData] = await Post.findOne(req.body, {
      where: {
        id: req.params.id,
      },
      attributes: ['title','created-at','content'],
      include:[ 
          {
          model: Comment,
          attributes: ['body'],
          model: User,
          attributes:['username','email']

          }
        ]
    });

    if (postData > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch {
    res.status(500).end();
  }
});



router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});


router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});




module.exports = router;
