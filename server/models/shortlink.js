const mongoose = require('mongoose')

const shortlinkSchema = mongoose.Schema({ 
	originallink: {
		type: String
	}, 
	shortlink: {
		type: String
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,  
		ref: 'User'
	},
})

module.exports = new mongoose.model('Link', shortlinkSchema)