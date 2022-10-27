const router = require("express").Router()
const { Cart } = require("../models/cart");


router.get('/:email', async (req, res)=>{
    try{
        const cart = await Cart.findOne({email: req.params.email});
        return res.status(200).send({cartList: cart.cartList, totalPrice: cart.totalPrice, totalQuantity: cart.totalQuantity})
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
    
})

router.post('/', async (req, res)=>{
    try{
        const cart = await Cart.findOne({email: req.body.email});
        if(cart)
            return res.status(409).send({message: "A favorite list for given email already exists!"})
        await new Cart({...req.body}).save();
        res.status(201).send({ message: "Cart list created!" });
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.patch('/:email', async (req, res)=>{
    try{
        const cart = await Cart.findOne({email: req.params.email})
        const product = req.body.product;
        const action = req.body.action;
        let totalPrice = 0;
        let totalQuantity = 0;
        if(cart){
            const findIfExists = cart.cartList.find(item => item.productCode === product.productCode);
            const copyList = [...cart.cartList].filter(item => item.productCode !== product.productCode);
            if(action === "add"){
                const newProduct = (findIfExists) ? {...findIfExists, quantity: findIfExists.quantity + 1} : {...product, quantity: 1};
                const newList = [...copyList, newProduct ];
                newList.forEach(item => {
                    const price = item.productPrice * item.quantity;
                    totalPrice = totalPrice + price;
                    totalQuantity = totalQuantity + item.quantity;
                })
                await Cart.updateOne({email: req.params.email}, {$set: {cartList: newList, totalPrice: totalPrice, totalQuantity: totalQuantity}})
                return res.status(200).send({message: 'Product added to cart!'})
            }

            if(action === "remove" && findIfExists){
                let newList;
                let newProduct;
                if(findIfExists.quantity <= 1){
                     newList = [...copyList]
                }else{
                    newProduct = {...findIfExists, quantity: findIfExists.quantity - 1}
                    newList = [...copyList, newProduct]
                }
                
                newList.forEach(item => {
                    const price = item.productPrice * item.quantity;
                    totalPrice = totalPrice + price;
                    totalQuantity = totalQuantity + item.quantity;
                })
                
                await Cart.updateOne({email: req.params.email}, {$set: {cartList: newList, totalPrice: totalPrice, totalQuantity: totalQuantity }})
                return res.status(200).send({message: 'One quantity removed from cart!'})
            }
        }
        return res.status(404).send({ message: "Can't find favorite list for email provided!" });
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})


module.exports = router;