const fs = require("fs");
var webshot = require('webshot');
var options = {
  siteType:'html'
, screenSize: {
    width: 320
  , height: 480
  }
, shotSize: {
    width: 320
  , height: 480
  }
};
module.exports.get_image = async (file) => {
  console.log("Saving images...")
  fs.readFile(file, function read(error, data){
    if(error){throw error;}
    webshot(data, 'hello_world.png', options, function(err) {});
  });
}
