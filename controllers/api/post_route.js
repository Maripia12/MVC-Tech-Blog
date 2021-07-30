const router = require("express").Router();
const { endsWith } = require("sequelize/types/lib/operators");
const { User, Post, Comment } = require("../../models");
const withAuth = require("../utils/auth");
const { route, put } = require("./user_route");

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

//TODO:
//PUT ROUTE FOR POST BY ID
router.put('/:id', withAuth,async (req,res)=>{
 
 try{
     const [updatedData]= await Post.update(req.body, {
        where:{
            id: req.params.id
        }
    })

    if(updatedData>0){
        res.status(200).end()
    }else{
        res.status(404).end()
    }
 }catch
 {res.status(500).end()
}
    
})

//TODO:
//DELETE ROUTE BY ID
router.delete('/:id', withAuth, async(req, res)=>{
    try{
        const [dataToDelete]= Post.destroy({
            where:{
                id: req.params.id
            }
        });

        if(dataToDelete>0){
        res.status(200).end()
    }else{
        res.status(404).end()
    }

    }catch{
res.status(500).end()
    }
});

module.exports = router;
