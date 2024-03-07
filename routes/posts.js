const express = require('express');
const authenticate = require('../middleware/authenticate')
const Post = require('../models/post')
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
//create a new post 
router.post('/create',async (req,res)=>{
    try {
        const {title,content}=req.body;
        const author = "65ea05d778fb2405df70254b";
        const post = new Post({title,content,author});
        await post.save();
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.get('/create',async (req,res)=>{
    res.render('addpost');
});
router.get('/',async (req,res)=>{
    try {
        const posts = await Post.find().populate('author','username')
        res.render('listePost', { posts: posts });
    } catch (error) {
        res.status(500).send('server error ')
    }
})

router.put('/:id',async (req,res)=>{
    try {
       const {id} = req.params;
       const{title,content} = req.body;
       const updatedPost = await Post.findByIdAndUpdate(id,{title,content},{new:true})
       res.send(updatedPost)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id',async (req,res)=>{
    try {
       const {id} = req.params;
       await Post.findByIdAndDelete(id)
       res.send('post deleted successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;