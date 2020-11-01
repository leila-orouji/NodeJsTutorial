
const express = require('express')
const dishRouter = express.Router();
const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');

dishRouter.get('/' , async(req,res,next)=>{
    try {
        const dishes = await Dishes.find({}).exec();
        res.json(dishes)
    } catch (error) {
        next(error);
    }
})

dishRouter.post( '/' ,authenticate.verifyUser, async(req,res,next)=>{
    try {
        let {name, description, image, category, label, price, featured }= req.body;
        let newDish = new Dishes({name, description, image, category, label, price, featured });
        await newDish.save();
        res.json(newDish)
    } catch (error) {
        next(error);
    }
   
})


dishRouter.put('/', authenticate.verifyUser, async (req,res,next)=>{
    try {
        res.statusCode = 403;
        res.end('Put operation is not supported on dishes.');
    } catch (error) {
        next(error);
    }
})


dishRouter.delete('/', authenticate.verifyUser, async(req,res,next)=>{
    try {
        let dishes = await Dishes.find({}).exec();  
        dishes.forEach(async(dish)=> await dish.remove())
    } catch (error) {
        next(error);
    }
})


dishRouter.get('/:dishId' , async(req,res,next)=>{
    try {
        const dish = await Dishes.findById(req.params.dishId).exec();
        res.json(dish)
    } catch (error) {
        next(error);
    }
})

dishRouter.post('/:dishId' , authenticate.verifyUser, async(req,res,next)=>{
    try {
        res.statusCode = 403;
        res.end('Post operation is not supported on dishes.');
    } catch (error) {
        next(error);
    }
});

dishRouter.put('/:dishId' , authenticate.verifyUser, async(req,res,next)=>{
    try {
        const dish = await Dishes.findById(req.params.dishId).exec();      
        await Dishes.findByIdAndUpdate(
            dish.id,
            {$set: req.body},
            {new: true}
            );
        res.json(dish);
    } catch (error) {
        next(error);
    }
})

dishRouter.delete('/:dishId' ,authenticate.verifyUser, async (req,res,next)=>{
    try {
        let dish = await Dishes.findById(req.params.dishId).exec();  
        await dish.remove(); 
    } catch (error) {
        next(error);
    }
})




module.exports = dishRouter;
