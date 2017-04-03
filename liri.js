var keys = require('./keys.js');
var Twitter = require('twitter');
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');

// the twitter function
function myTweets() {
    // this is grabbing my keys from keys.js
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumerKey,
        consumer_secret: keys.twitterKeys.consumerSecret,
        access_token_key: keys.twitterKeys.accessTokenKey,
        access_token_secret: keys.twitterKeys.accessTokenSecret
    });
// this is setting params to the screenname and setting a limit
    var params = {screen_name: 'laravelphp', count: 20};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("finish");
            for (var i = 0;i < tweets.length;i++) {
                console.log(tweets[i].text);
            }
        }
    });
}
// the omdb function
function movie() {

    request(queryUrl, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var body = JSON.parse(body);
           // console.log("The movie's rating is: " + body.imdbRating);
           // console.log(body);
            console.log(body.Title);
            console.log(body.Year) ;
            console.log(body.Rated) ;
            console.log(body.Country);
            console.log(body.Language);
            console.log(body.Plot);
            console.log(body.Actors);
            console.log(body.Ratings[1]);
            //console.log(queryUrl);
        }
    });
}

function songs() {

    var spotifyApi = new SpotifyWebApi({
        clientId: keys.spotifyKeys.clientId,
        clientSecret: keys.spotifyKeys.clientSecret,
        redirectUri: keys.spotifyKeys.redirectUri,
    });


    spotifyApi.searchTracks(trackName)
        .then(function (data) {
            console.log(data.body.tracks.items[0].artists[0].name);
            console.log(data.body.tracks.items[0].name);
            console.log(data.body.tracks.items[0].preview_url);
            console.log(data.body.tracks.items[0].album.name);

            }, function (err) {
            console.error(err);
        });

}



// im grabbing the userinput and calling the function
var userinput = process.argv[2];
//console.log(userinput);
//console.log(movieName);
var movieName = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "=&plot=short&r=json";
var trackName = process.argv[3];


switch (userinput){
    case "myTweets":
        myTweets();
        break;

    case "Movie-this":
        movie(queryUrl);
        break;

    case "spotify-this-song":
        songs(trackName);
        break;
}

