const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin')

// When user sign in then automaticaly create my profile database


const bodyParser = require('body-parser');
const {body , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const JWT_SECRET  = "Piyushisgoodboy";
const fetchuser = require('../middelware/fectchuser');


router.use(bodyParser.json())


//Route:1 sign up admin , POST "/api/admin/signup"
router.post('/signup',[
    body('name','Enter a valid name').isLength({min:2}),
    body('email',"Enter a valid email").isEmail()
], async function (req, res){
    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        // check the user already exit orr not
        let user =  await Admin.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success, error:"Sorry a user is already exist."});
        }

        if(!(req.body.password === req.body.rpassword)){
            return res.status(400).json({success, error:"Sorry password is not same"});
        }
        //Use bcrypt fucntion to generate hash not password store in database
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt) 

        //create new users
        user = await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
            rpassword:secPass
        });
        
        // JSON WEB TOKEN while user sign in 
        
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});


    }catch(err){
        console.log("Error : " + err.message);
        res.status(500).json({success,  message:"Some Error occure"});
    }
})

//Route :2 login admin POST:"/api/admin/login"

router.post('/login',  [
    body('username',"Enter a valid email").isEmail(),
    body('password','Enter a password').isLength({min:1})
],async function (req, res) {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password } = req.body;
    try{

        // let Admin = await Admin.findOne({email})  it also posible
        let admin = await Admin.findOne({email: username})
        if(!admin){
            success = false;
            return res.status(400).json({success, errors:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password,admin.password)
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, errors:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:admin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken})

    }catch(err){
        console.log("Error : " + err.message);
        res.status(500).json({message:"An internal error"});
    }
})

// Route:3 Get logged in user details user POST "/api/auth/getuser" login required

router.post('/getadmin',fetchuser,async(req,res)=>{
    try{
        userid =  req.user.id;
        const user = await Admin.findById(userid).select("-password");
        res.json({user})
    }catch(e){
        res.status(500).json({message:"This is internal Error...."})
    }
})

module.exports = router;