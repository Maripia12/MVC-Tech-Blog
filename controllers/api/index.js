const router = require('express').Router();

const userRoute = require('./user_route');
const postRoute = require('./post_route');
const commentRoute = require('./comment_route');

router.use('/user', userRoute);
router.use('/post' , postRoute);
router.use('/comment', commentRoute);

module.exports = router;