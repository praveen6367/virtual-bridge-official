const express = require('express');
const router = express.Router();
const FoodType = require('../models/Food_Type')

const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator')
const fetchuser = require('../middelware/fectchuser');

router.use(bodyParser.json())


//Route:1 sign up user , POST "/food/type/add"
router.post('/add',[
    body('type','Enter a valid type').isLength({min:2})
], async function (req, res){
    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        // check the user already exit orr not
        let type =  await FoodType.findOne({type:req.body.type});

        if(type){
            return res.status(400).json({success, error:"This type is already exist."});
        }

        //Create New Users
        type = await FoodType.create({
            type:req.body.type
        });

        success = true;
        res.json({success});
        
    }catch(err){
        console.log("Error : " + err.message);
        res.status(500).json({success,  message:"Some Error occure"});
    }
})


//Route :2 Fetch all the Food type GET:"/food/type/fetchalltype"
router.get('/fetchalltype', async (req, res) => {
    try {
      const docs = await FoodType.find({});
      res.json(docs)
    } catch (err) { console.log(err); }
  })

module.exports = router;