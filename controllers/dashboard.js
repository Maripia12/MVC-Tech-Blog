const router = require("express").Router();
const {  Post  } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth,  (req,res)=> {
    
         Post.findAll({
            where:{
                userId:req.session.userId
            }
        }).then((postData)=>{

            const posts = postData.map((post)=> post.get({plain:true}));
            
            res.render('all-post-user', {
                layout:'dashboard',
                posts,
            })
        }).catch(err=>{
            console.log(err);
            res.redirect("login")
        })



   
})


router.get('/new', withAuth, (req, res)=>{
    res.render('newPost', {
        layout: 'dashboard'
    })
});

router.get('/edit/:id', withAuth, async (req, res)=> {
    try{
        const postData = await Post.findByPk(req.params.id);

        if (postData){
            const post = postData.get({plain:true});
            res.render('edit', {
                layout:'dashboard',
                post
            })

        } else{
res.status(404).end()
        }

    } catch{
res.redirect('login')
    }
})




module.exports = router;