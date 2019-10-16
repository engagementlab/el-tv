'use strict'

const express = require('express'),
			router = express.Router(),
			request = require('request'),
            cloudinary = require('cloudinary'),
            download = require('image-downloader'),
            shell = require('shelljs');

/* Generate slideshow video. */
router.get('/', function(req, res, next) {

	let cdnPrefix = 'site/tv-slideshow';
    let text = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien.'];
    cloudinary.v2.api.resources(
        {resource_type: 'image', type: 'upload', prefix: cdnPrefix},
        (err, result) => {
            if(err) console.error(err);

            result['resources'].forEach((record, i) => {
               let imgUrl = (cloudinary.url(record.public_id, {width: 1920, height: 1080, mode: 'fit', type: 'upload'}) + '.jpg');
            //    console.log(imgUrl)
            
            let dlOptions = {url: imgUrl, dest: __dirname + '/../public/images/slides/' + i + '.jpg'};
            download.image(dlOptions)
                .then(({ filename, image }) => {
                    console.log('Saved to', filename)  // Saved to /path/to/dest/image.jpg
                })
                .catch((err) => console.error(err))
            });
            
            // let slideshowBash = shell.exec(__dirname + '/../slideshow.sh', {async: true});
            // // slideshowBash.stdout.on('data', function(data) {
            // //     console.log(data)
            // // });
            // slideshowBash.stdout.on('close', function(data) {
            //     console.log('video rendered')
            // });
                shell.exec(__dirname + '/../text.sh "' + text.join(',') + '"');
            res.status(200).send('ok');
        });

});

router.post('/', function (req, res) {
	
	req.app.io.emit('refresh');
	res.send('success');

});

module.exports = router;
