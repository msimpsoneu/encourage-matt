var fs = require('fs'),
    path = require('path'),
    request = require('request').defaults({encoding:null}),
    twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var twit = new twit(config);

request.get(config.gif_url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        var gif = new Buffer(body).toString('base64');

        twit.post('media/upload', { media_data: gif }, function(error, data, response) {
            if (error) {
                console.log('error:');
                console.log(error);
            }
            else {
                twit.post('statuses/update', {status: config.message, media_ids: data.media_id_string}, function(error, data, response) {
                    console.log(data);
                });
            }
        });
    }
});

