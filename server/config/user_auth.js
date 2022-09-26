const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verify = async (req, res, next) => {
	try {
		console.log(req.cookies)
		const token = req.cookies.knecst 

		const decoded = jwt.verify(token, process.env.JWT_SECRET) 
		const user = await User.findOne({_id: decoded._id, "tokens.token": token})

		if(!user) return new Error("user not found")
		req.user = user
		req.token = token
		next()
	} catch (err) {
		return console.log("can not verify user, err: ", err.message)
	}
}

module.exports = verify