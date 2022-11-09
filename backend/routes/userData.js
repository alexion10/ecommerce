const router = require("express").Router()
const {User} = require("../models/user");
const { authenticateToken } = require("./middleware");

router.patch('/:email', authenticateToken, async (req, res) => {
    try {
        if(req.user.role !== 'admin') 
            return res.status(403).send('You are not authorizen for this action')
        
        const userEmail = await User.findOne({email: req.params.email})
        if (userEmail === null) {
            return res.status(404).send({message: 'Cannot find user'});
        }

        await User.updateOne({email: req.params.productCode, $set: {role: req.body.role}})
        return res.status(200).send({message: `Role updated` })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;
