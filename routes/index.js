'use strict'

const express = require('express'),
			router = express.Router(),
			request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

	let url = 'https://elab.emerson.edu/';
	let videoUrl = 'https://res.cloudinary.com/engagement-lab-home/video/upload/v1571255474/el-tv/slideshow.mp4';
	request({ url: url+'api/tv/get', json: true }, (error, response, body) => {
		
		let data = {
			chyron: JSON.stringify(body[0].currentBlurb),
			video: videoUrl
		};
		
		res.render('index', { 'data': data });

	});

});

router.post('/', function (req, res) {
	
	req.app.io.emit('refresh');
	res.send('success');

});

module.exports = router;
