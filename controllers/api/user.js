const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
 



router.post("/", async (req, res) => {
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
      res.redirect('/');

      res.json(userData);
    });
  });
});

//Post route to login

router.post('/login', (req,res)=>{
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(userData => {
        if(!userData) {
            res.status(400).json({message:'Incorrect username. Try again.'});
            return;
        }

        if(!userData.checkPassword(req.body.password)){
          res.status(400).json({message:'wrong password'})
          return
        }

        req.session.save(()=>{
          req.session.userId = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;

          res.json({user: userData, message: 'logged in'})
        })
       
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