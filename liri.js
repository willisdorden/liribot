var keys = require('./keys.js');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumerKey,
    consumer_secret: keys.twitterKeys.consumerSecret,
    access_token_key: keys.twitterKeys.accessTokenKey,
    access_token_secret: keys.twitterKeys.accessTokenSecret
});
var params = { screen_name: 'laravelphp', count: 20 };

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log("finish");
        console.log(tweets);
    }
});
