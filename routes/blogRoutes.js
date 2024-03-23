const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

router.get('',async (req,res) => {
    let blogs = await Blog.find().sort({createdAt : -1});
    res.render('home',{
        blogs,
        title : "Home"
    })
});

router.post('',async (req,res) => {
    let {title,intro,body} = req.body;

    let blog = new Blog({
        title,
        intro,
        body
    });

    await blog.save();

    res.redirect('/');
});

router.get('/create',(req,res) => {
    res.render('blogs/create', {
        title : 'Blog Create'
    });
});

router.post('/:id/delete',async (req,res,next) => {
    try {
        let id = req.params.id;
        await Blog.findByIdAndDelete(id);
        res.redirect('/');
    }catch(e) {
        console.log(e)
        next()
    }
})

router.get('/:id',async (req,res,next) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        res.render('blogs/show',{
            blog,
            title : "Blog Detail"
        })
    }catch(e) {
        console.log(e)
        next()
    }
})

module.exports = router;