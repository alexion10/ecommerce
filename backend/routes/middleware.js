const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(" ")[1];
	if(!token) return res.status(401).send({message: "Please send us a token!"})

	jwt.verify(token, process.env.JWTPRIVATEKEY,(err, user)=>{
		if(err) return res.status(403).send({message: "Please send us a valid token!"})
		req.user = user;
		next()
	})

}

module.exports = { authenticateToken };