const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const verify = require('../config/user_auth')

const router = express.Router()


router.get('/', (req, res) => {
	res.render('index')
})

router.get('/user/dashboard', (req, res) => {
	res.render('index')
})

router.get('/signup', (req, res) => {
	res.render('signup')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.get('/dashboard', verify, (req, res) => {
	res.render('dashboard')
})

router.post('/signup', async (req, res) => {
	try {
		const user = new User(req.body)

		const token = await user.genToken()

		user.password = await bcrypt.hash(user.password, 7) //hashing password


		await user.save()
		res.cookie("knecst", token)
		res.redirect('/')
	} catch(err) {
		res.send({
			msg: "something went wrong",
			err: err.message
		})
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({email: req.body.email})
		if(!user) return new Error("user not found")

		const isCorrect = bcrypt.compare(req.body.password, user.password)
		if(!isCorrect) return new Error("Incorrect password")

		const token = await user.genToken()
		console.log("token: ", token)
		res.cookie("knecst", token)

		res.redirect('/')
	} catch(err) { 
		res.send({
			msg: "something went wrong",
			err: err.message
		})
	}
}) 


router.get('/mylinks', verify, (req, res) => {
	try {
		res.send({
			msg: "verification working"
		})
	} catch(err) {
		res.send({
			msg: "nah! can not verify"
		})
	}
})

module.exports = router