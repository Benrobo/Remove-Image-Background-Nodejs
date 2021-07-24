const dotenv = require('dotenv').config()
const {API_KEY} = process.env;
const express = require("express");
const path = require("path")
const app = express();
var request = require("request");
var fs = require("fs");
const fileUpload = require('express-fileupload');
// express upload middleware
app.use(fileUpload());

function log(val){
  return console.log(val)
}

function handleUpload(req, res, file) {
  if(file == undefined){
    log({msg: "something went wrong, file could not be procesed"})
    return res.send({msg: "something went wrong, file could not be procesed"})
  }
  let proto = ["http", "https", "jpg", "png", "PNG", "JPEG", "JPG"]
  let url = new URL(file)
  let checkImgType = path.extname(url.pathname).replace(".", "")
  // log(proto.includes(`'${checkImgType}'`))
  if(!proto.includes(url.protocol.replace(":", ""))){
    log({
      msg: "File could not be uploaded, file protocol is invalid"
    })
    return res.send({
      msg: "File could not be uploaded, file protocol is invalid"
    })
  }
  else if(!proto.includes(checkImgType)){
    log({
      msg: "File could not be uploaded, file type is invalid"
    })
    return res.send({
      msg: "File could not be uploaded, file type is invalid"
    })
  }
  else{
    // remove background function
    removeBg(file, res)
  }
}

function removeBg(file, res){
  request.post(
    {
      url: "https://api.remove.bg/v1.0/removebg",
      formData: {
        image_url: file,
        size: "auto",
      },
      headers: { 
        "X-Api-Key": `${API_KEY}`,
      },
      encoding: null,
    },  
    function (error, response, body) {
      if (error) {
        return console.error("Request failed:", error)
      };
      
      if (response.statusCode != 200){
        // return console.log("ERROR OCCUR")
        res.send({
          statusCode: response.statusCode,
          Error:body.toString("utf8"),
        })
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      }
        // create a folder in users file system
        if(!fs.existsSync("no-bg")){
          fs.mkdir(path.join(__dirname, "../logic", "../no-bg"), (err)=>{
            if(err){
             return log(err)
            }
          })
        }
        // append the no-background image inside folder
        fs.writeFileSync(path.join(__dirname, "../logic", "../no-bg/"+ Date.now()+"-no-bg.png"), body);

        log({ status: "success, file have been moved to the following path " + path.join(__dirname, "../logic", "/no-bg"), file_path: path.join(__dirname, "../logic", "/no-bg") })

        fs.readdir(path.join(__dirname, "../logic", "../no-bg/"), (err, data)=>{
          return res.send({ status: "success, file have been moved to the following path ", 
          dir: `http://localhost:5000/no-bg/`, 
          file: data
          });
        })
    }
  );
}


module.exports = {
  handleUpload,
};
 