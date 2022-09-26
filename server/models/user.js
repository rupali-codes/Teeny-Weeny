const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		lowercase: true,
		trime: true, 
		required: true,
		unique: true,
		validate: (value) => {
			if(!validator.isEmail(value)) 
				throw new Error ("Invalid email!")
		}
	},
	password: {
		type: String,  
		minlength: 6,  
		lowercase: true,
		required: true,  
		trime: true,
		validate: (value) => {
			if(value.toLowerCase().includes('password')) 
				throw new Error ("Invalid password!")
		}
	},
	tokens: [{
		token: {
			type: String,  
			required: true
		}
	}]
})

userSchema.methods.genToken = async function () {
	const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET)

	this.tokens = this.tokens.concat({token})
	await this.save()
	return token
}

module.exports = new mongoose.model('User', userSchema)