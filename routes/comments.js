const express = require('express')
const commentRouter = express.Router();
const Comments = require('../models/comments');
const Dishes = require('../models/dishes');

commentRouter.route('/:dishId/comments')
.get( async(req,res,next)=>{
    try {
        // let comments = await Comments.find({dishId: req.params.dishId}).exec()
        let dishes = await Dishes.findById(req.params.dishId).populated({
            path: 'comments'
        }).exec()
        if(!dishes){
            err = new Error ('Dish'+ req.params.dishId+' Not found');
            err.status = 404;
            return next(err) 
        }
        return res.json(dishes)
    } catch (error) {
        next(error);
    }
})


.post( async(req,res,next)=>{
    try {
        let dishes = await Dishes.findById(req.params.dishId).populated({
            path: 'comments'
        }).exec()
        if(!dishes){
            err = new Error ('Dish'+ req.params.dishId+' Not found');
            err.status = 404;
            return next(err) 
        }
        else{
            let {author, rating, comment}= req.body
            let newComment = new Comments({author, rating, comment, dishId: req.params.dishId})
            return res.json(newComment)
        }  
    } catch (error) {
        next(error);
    }
})

.put( async (req,res,next)=>{
    try {
        res.statusCode = 403;
        res.end('Put operation is not supported on commnets.');
    } catch (error) {
        next(error);
    }
})


.delete(async(req,res,next)=>{
    try {
        // let comments = await Comments.find({dishId: req.params.dishId}).exec()
        let dishes = await Dishes.findById(req.params.dishId).populated({
            path: 'comments'
        }).exec()
        if(!dishes){
            err = new Error ('Dish'+ req.params.dishId+' Not found');
            err.status = 404;
            return next(err) 
        }
        dishes.comments.map(async(comment)=> await comment.remove())
        return res.json('All comments are deleted')
    } catch (error) {
        next(error);
    }
})

commentRouter.route('/:dishId/comments/:commentId' )
.get( async(req,res,next)=>{
    try {
        // let comments = await Comments.find({dishId: req.params.dishId}).exec()
        let comments = await Comments.findById(req.params.commentId).exec()
        if(!comments){
            err = new Error ('Comment'+ req.params.commentId+' Not found');
            err.status = 404;
            return next(err) 
        }
        return res.json(comments)
    } catch (error) {
        next(error);
    }
})

.post(async(req,res,next)=>{
    try {
        res.statusCode = 403;
        res.end('Post operation is not supported on dishes.');
    } catch (error) {
        next(error);
    }
})

.put( async(req,res,next)=>{
    try {
        const comment = await Comments.findById(req.params.commentId).exec();   
        if(!comment){
            err = new Error ('Comment'+ req.params.commentId+' Not found');
            err.status = 404;
            return next(err) 
        }   
        await Comments.findByIdAndUpdate(
            comment.id,
            {$set: req.body},
            {new: true}
            );
        res.json(comment);
    } catch (error) {
        next(error);
    }
})

.delete(async (req,res,next)=>{
    try {
        const comment = await Comments.findById(req.params.commentId).exec();   
        if(!comment){
            err = new Error ('Comment'+ req.params.commentId+' Not found');
            err.status = 404;
            return next(err) 
        }   
        await comment.remove()
    } catch (error) {
        next(error);
    }
})




module.exports = commentRouter;
