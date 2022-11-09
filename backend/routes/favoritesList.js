const router = require("express").Router()
const { Favorite } = require("../models/favorites");
const { authenticateToken } = require("./middleware");

router.get('/', authenticateToken, async (req, res)=>{
    try{
        const favorite = await Favorite.findOne({email: req.user.email});
        return res.status(200).send(favorite.favoriteList)
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
    
})

router.post('/', async (req, res)=>{
        try{
            const favorite = await Favorite.findOne({email: req.body.email});
            if(favorite)
                return res.status(409).send({message: "A favorite list for given email already exists!"})
            await new Favorite({...req.body}).save();
            res.status(201).send({ message: "Favorite list created!" });
        }catch(error){
            res.status(500).send({ message: "Internal Server Error" });
        }
})

router.patch('/', authenticateToken, async (req, res)=>{
    try{
        const favorite = await Favorite.findOne({email: req.user.email})
        if(favorite){
            const copyList = [...favorite.favoriteList];
            const exists = copyList.find(item => item.id === req.body.id)
            const sendNewList = (exists) ? copyList.filter(product => product.id !== req.body.id) : [...copyList, req.body];
            await Favorite.updateOne({email: req.user.email}, {$set: {favoriteList: sendNewList}})
            return res.status(200).send('Favorite list updated!');
        }
        return res.status(404).send({ message: "Can't find favorite list for email provided!" });
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})


module.exports = router;