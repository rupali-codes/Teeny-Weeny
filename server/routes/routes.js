const express = require('express')

const router = express.Router()

router.get('/user/dashboard', (req, res) => {
	res.send({msg: "running perfectly"})
})

module.exports = router