const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const formidable = require('formidable')

app.use(bodyParser.json())

router.post("/api/removeBg", (req, res)=>{
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error', err)
          throw err
        } 
        console.log('Files', files)
    })
})


module.exports = {
    router
}

