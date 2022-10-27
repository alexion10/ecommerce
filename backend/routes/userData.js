const router = require("express").Router()
const {User} = require("../models/user");


router.patch('/:email', async (req, res) => {
    try {
        const userEmail = await User.findOne({email: req.params.email})
        if (userEmail === null) {
            return res.status(404).send({message: 'Cannot find user'});
        }

        await User.updateOne({email: req.params.productCode, $set: {role: req.body.role}})
        return res.status(201).send({message: `Role updated` })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;
