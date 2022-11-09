const router = require("express").Router();
const { AddProducts } = require("../models/products");
const { authenticateToken } = require("./middleware");


router.post("/", authenticateToken, async (req, res) => {
	try {
        //check if product exist in database
		const product = await AddProducts.findOne({ productCode: req.body.productCode });
		if (product)
			return res
				.status(409)
				.send({ message: "Product with given code already Exist!" });
        
        //save product to db
        await new AddProducts({...req.body, productPrice: Number(req.body.productPrice)}).save();

        //return msg if the product was created in the database
		res.status(201).send({ message: "Product created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete product
router.delete('/:id', authenticateToken, async (req, res)=> {
    try{
        //delete item
        await AddProducts.remove({_id: req.params.id});
        //return msg if product was deleted
        res.status(200).send({message: 'Product deleted successfully'});
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})

//update product info
router.patch('/:productCode', authenticateToken, async (req,res)=>{
    try{
        await AddProducts.updateOne({productCode: req.params.productCode}, {$set:req.body})
        res.status(200).send({message: 'Product Updated'})
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
    
})

// get all the products 
router.get('/', authenticateToken, async (req, res) =>{
    try{
        //get all products from db
        const products = await AddProducts.find();
        //send products to frontend
        return res.status(200).send(products);
    }catch(error){
        res.status(500).send({ message: "Internal Server Error"})
    }
})


module.exports = router;