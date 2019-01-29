const fs = require("fs");
var webshot = require('webshot');
const html_editer = require('../scripts/html_editer.js')

var options = {
  siteType:'html'
, screenSize: {width: 320, height: 480}
, shotSize: {width: 320, height: 480}
};

module.exports.get_image = async () => {
    var data = html_editer.write_tag("b1", "Hi user!").then()
    webshot(data, './sources/img_output.png', options, function(error) {});
}
