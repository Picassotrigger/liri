//===================   PACKAGES   ===================
var fs = require("fs");








//===================   VARIABLES   ===================

var command = process.argv[2];

var media = process.argv[3];



//===================   MAIN   ===================

switch (command) {
  case "my-tweets":
    // console.log("You selected: My tweets");

    var Twitter = require("twitter");
    var keys = require("./keys.js");

    var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {
      screen_name: 'omicron_health'
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        //console.log(tweets);

        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text);
        }
      }
    });
    break;

  case "spotify-this-song":
    // console.log("You selected: Spotify this song");

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
      id: "69e888fc0a8549f596e66755ea883a64",
      secret: "dfbe980a6614428b9e0b35b5a1e2ec44"
    });

    spotify
      .search({
        type: 'track',
        query: media,
        limit: 1
      })
      .then(function(response) {
        //console.log(response);
        // console.log(JSON.stringify(response, null, 2));
        console.log("Artist: " + response.tracks.items[0].artists[0].name); // Artist name
        console.log("Song: " + response.tracks.items[0].name); // Song name
        console.log("Preview Link: " + response.tracks.items[0].preview_url); // Preview link
        console.log("Album: " + response.tracks.items[0].album.name); // Album name
      })
      .catch(function(err) {
        console.log(err);
      });
    break;

  case "movie-this":
    // console.log("You selected: Movie this");

    var request = require('request');

    request("http://www.omdbapi.com/?t=" + media + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log(JSON.parse(body, null, 4));
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    });
    break;

  case "do-what-it-says":
    // console.log("You selected: Do what it says");

    fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
        return console.log(error);
      }

      // We will then print the contents of data
      console.log('data: ' + data);

      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

      // We will then re-display the content as an array for later use.
      console.log("array: " + dataArr);

      command = dataArr[0];
      media = dataArr[1];

      console.log("command: " + command);
      console.log("media: " + media);
    });

    var cmd = require('node-cmd');
    cmd.run('node liri.js spotify-this-song "Kiss"');


    var nrc = require('node-run-cmd');
    nrc.run('node liri.js spotify-this-song "Kiss"');


    break;

  default:

}




//===================   END   ===================
