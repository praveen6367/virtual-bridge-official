const express = require('express');
const router = express.Router();
const Food = require('../models/Food')

const bodyParser = require('body-parser');
const { body, validator, validationResult } = require('express-validator')

router.use(bodyParser.json())



//Route :1 ADD new FOOD  POST:"/food/add"

router.post('/addfood', [
    body('title', "Title is not true").isLength({ min: 1 }),
    body('description', 'Enter a des').isLength({ min: 1 }),
    body('price', 'Enter a password').isLength({ min: 1 }),
    body('rating', 'Enter a password').isLength({ min: 1 }),
    body('type', 'Enter a password').isLength({ min: 1 })

], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let image = (req.body.image_photo).replace(/^.*[\\\/]/, '');
    console.log(image)

    try {
        let food = await Food.create({
            image: image,
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            price: req.body.price,
            discount: req.body.discount,
            type:req.body.type
        });

        success = true;
        res.json({ success })
    } catch (e) {
        console.log(e)
        res.status(500).json({ success, message: "Internal Error found" });
    }
});

//Route :2 Fetch all the Food GET:"/food/fetchallfood"
router.get('/fetchallfood', async (req, res) => {
    try {
      const docs = await Food.find({});
      res.json(docs)
    } catch (err) { console.log(err); }
  })

//Route :3 delete food by the admin DELETE:"/food/deletefood/6767666fyt6"
router.delete('/deletefood/:id', async (req, res) => {
    try {
        let success = false;
        let food = await Food.findById(req.params.id);
        if (!food) { return res.status(401).send("Not found") }

        food = await Food.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, food, message: 'Food has been deleted' });
    } catch (err) { console.log(err); }
})

//Route :4 UPDATE Food by the admin PUT:"/updateFood/:id"
router.put('/updatefood/:id', async (req, res) => {

    let success = false;

    const { title, description, price, discount, rating } = req.body;

    let image; 

    if(req.body.image_photo)
       image = (req.body.image_photo).replace(/^.*[\\\/]/, '');
    
    // console.log(image)

    // create a update object
    const updateFood = {};
    // if "image" is given in the req.body then set the upadate otherwise previous count
    if (image) updateFood.image= image;
    if (title) updateFood.title = title;
    if (description) updateFood.description = description;
    if (price) updateFood.price = price;
    if (discount) updateFood.discount = discount;
    if (rating) updateFood.rating = rating;
    

    let food = await Food.findById(req.params.id);
    // Check the user is exit or not
    if (!food) {
        res.status(400).json({ success, message: "Food not found" });
    }

    food = await Food.findByIdAndUpdate(req.params.id, { $set: updateFood }, { new: true });
    success = true;
    res.json({ success, food })
});

//Route :5 Fetch by Food id GET:"/Foods"
router.get('/fetchfood/:id', async (req, res) => {
    try {
        const docs = await Food.findById(req.params.id);
        res.json(docs)
    } catch (err) {
        // console.log(err);
        res.status(500).json({ message: "Internal Error found" });
    }
})

module.exports = router;