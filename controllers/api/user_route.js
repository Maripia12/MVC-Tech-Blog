const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../utils/auth");

//GET API-user

router.get('/' , (req, res) => {
    User.findAll({
        attributes: {exclude:['password']}

    })
    .then(userData=> res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);

    });

});

//Post route to create user

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
    req.session.save(() => {
      req.session.id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.loggedIn = true;

      res.json(userData);
    });
  });
});

//Post route to login

router.post('/login', (req,res)=>{
    User.findOne({
        where:{
            email: req.body.username
        }
    }).then(userData => {
        if(!userData) {
            res.status(400).json({message:'Incorrect password. Try again.'});
            return;
        }


        req.session.save(() => {
            req.session.id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({userData, message:'You are now logged in'});
        });
    });
});

//Post route to logout

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;