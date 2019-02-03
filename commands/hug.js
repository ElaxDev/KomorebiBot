const Discord = module.require('discord.js');
const info = module.require('./help.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var jsdom = require("jsdom");

module.exports.run = async (bot, message, args, help) => {
  if(!args[0]) {
    message.channel.send("¡Necesitas especificar a quien quieres abrazar!\n Si no tienes amigos puedo dejar que me lo hagas uwu");
  }
  var share_gif;
  var preview_gif;
  var random = Math.floor(Math.random(0, 21));

  // url Async requesting function
  function httpGetAsync(theUrl, callback)
  {
      // create the request object
      var xmlHttp = new XMLHttpRequest();

      // set the state change callback to capture when the response comes in
      xmlHttp.onreadystatechange = function()
      {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          {
              callback(xmlHttp.responseText);
          }
      }

      // open as a GET call, pass in the url and set async = True
      xmlHttp.open("GET", theUrl, true);

      // call send with no params as they were passed in on the url string
      xmlHttp.send(null);

      return;
  }

  // callback for the top 8 GIFs of search
  function tenorCallback_search(responsetext)
  {
      // parse the json response
      var response_objects = JSON.parse(responsetext);

      top_10_gifs = response_objects["results"];

      // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

      preview_gif = top_10_gifs[random]["media"][random]["nanogif"]["url"];

      share_gif = top_10_gifs[random]["media"][random]["tinygif"]["url"];
      message.channel.send(share_gif);
      return;

  }


  // function to call the trending and category endpoints
  function grab_data(anon_id)
  {
      // set the apikey and limit
      var apikey = "45BHBNXTQ6TX";
      var lmt = 20;

      // test search term
      var search_term = "anime hug";

      // using default locale of en_US
      var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" +
              apikey + "&limit=" + lmt + "&anon_id=" + anon_id;

      httpGetAsync(search_url,tenorCallback_search);

      // data will be loaded by each call's callback
      return;
  }


  // callback for anonymous id -- for first time users
  function tenorCallback_anonid(responsetext)
  {
      // parse the json response
      var response_objects = JSON.parse(responsetext);

      anon_id = response_objects["anon_id"];

      user_anon_id = anon_id;

      // pass on to grab_data
      grab_data(anon_id);
  }

  // SUPPORT FUNCTIONS ABOVE
  // MAIN BELOW

  // if returning user, grab their stored  anonymous ID and jump directly to getting data
  // anon_id = <from cookies>
  // user_anon_id = anon_id;
  // grab_data(anon_id);

  // else first time user
  var url = "https://api.tenor.com/v1/anonid?key=" + "45BHBNXTQ6TX";

  // start the flow by getting a new anonymous id and having the callback pass it to grab_data
  httpGetAsync(url,tenorCallback_anonid);
}

module.exports.config = {
  name: "hug",
  usage: "",
  level: 3
}
