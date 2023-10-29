const express = require('express');
const router = express.Router();
const Shopping_cart = require('../models/Shopping_cart')

const bodyParser = require('body-parser');
const { body, validator, validationResult } = require('express-validator')
const fetchuser = require('../middelware/fectchuser');


router.use(bodyParser.json())


//Route :1 ADD new FOOD  POST:"/shoppingcart"

router.post('/shooping-cart', fetchuser, [
    body('title', "Valid food name").isLength({ min: 1 }),
    body('price', 'Enter price').isLength({ min: 1 }),
    body('quantity', 'Enter a valid quantity').isLength({ min: 1 }),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let image = (req.body.image).replace(/^.*[\\\/]/, '');
    console.log(image)

    try {
        let cart = await Shopping_cart.create({
            user: req.user.id,
            image: image,
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity
        });

        success = true;
        res.json({ success })
    } catch (e) {
        console.log(e)
        res.status(500).json({ success, message: "Internal Error found" });
    }
});

//Route :2 Fetch all the cart items GET:"/cart/fetchallcart"
router.get('/fetchallcart', fetchuser, async (req, res) => {
    try {
        const docs = await Shopping_cart.find({});
        res.json(docs)
    } catch (err) { console.log(err); }
})


//Route :3 Fetch all the cart items GET:"/cart/fetch-user-item"
router.get('/fetch-user-item', fetchuser, async (req, res) => {
    try {
        const docs = await Shopping_cart.find({user:req.user.id});
        res.json(docs)
    } catch (err) { console.log(err); }
})


//Route :4 delete food by the admin DELETE:"/cart/remove/6767666fyt6"
router.delete('/remove/:id',fetchuser, async (req, res) => {
    try {
        let success = false;
        let item = await Shopping_cart.findById(req.params.id);
        if (!item) { return res.status(401).send("Not found") }

        item = await Shopping_cart.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, item, message: 'cart item has been remove' });
    } catch (err) { console.log(err); }
})

module.exports = router;