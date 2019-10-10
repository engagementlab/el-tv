'use strict'

const express = require('express'),
			router = express.Router(),
			request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

	let url = (process.env.NODE_ENV === 'production') ? 'https://elab.emerson.edu/' : 'https://qa.engagementgamelab.org/';
	let data = 'https://res.cloudinary.com/engagement-lab-home/video/upload/v1570742177/el-tv/slideshow.mp4';
	res.render('index', { 'data': data });
	// request({ url: url+'api/tv/get', json: true }, (error, response, body) => {

	// 	let data = {
	// 		images: body[0].slideshowImages,
	// 		chyron: JSON.stringify(body[0].currentBlurb),
	// 		hasVideo: body[0].displayVideo,
	// 		videoId:  body[0].videoId
	// 	};
		

	// });

});

router.post('/', function (req, res) {
	
	req.app.io.emit('refresh');
	res.send('success');

});

module.exports = router;
