'use strict'

const express = require('express'),
			router = express.Router(),
			request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

	let url = (process.env.NODE_ENV === 'production') ? 'https://elab.emerson.edu/' : 'https://qa.engagementgamelab.org/';
	request({ url: url+'api/tv/get', json: true }, (error, response, body) => {

		let data = {
			images: body[0].slideshowImages,
			chyron: body[0].currentBlurb
		};
	  res.render('index', { 'data': data });

	});

});

module.exports = router;
