const express = require('express')
const User = require('../models/user')
const Shortlink = require('../models/shortlink')
const bcrypt = require('bcrypt')
const verify = require('../config/user_auth')

const router = express.Router()

// methods
// const shortIt = async function(link) {
//     try {
//         const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}/very/long/link.html`);

//         const data = await res.json();
//         return data;
//     } catch (err) {
//         throw new Error(err)
//     }
// }


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

		res.redirect('/dashboard')
	} catch(err) { 
		res.send({
			msg: "something went wrong",
			err: err.message
		})
	}
}) 

router.post('/shortit', verify, async (req, res) => {
	try {
		const link = new Shortlink(req.body)
		
		link.author = req.user._id

		console.log("link request body: ", link)

		await link.save()
		res.redirect('dashboard')
	} catch(err) {
		res.send({
			msg: "try again later",
			err: err.message
		})
	}
})

//test
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