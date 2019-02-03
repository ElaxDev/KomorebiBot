const jimp = require("jimp")


module.exports = async() => {
  jimp.read("./KnightMistery.png",(error, image) =>{
      let pac = jimp.read("./pac_man.png");
      pac.com(image,0,0)
      image.write("Output.png")
  });
}
