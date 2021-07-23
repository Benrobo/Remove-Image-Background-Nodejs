const express =  require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({ extended: false }));

const {handleUpload} = require("../logic/handleUpload")

router.post("/upload", (req, res)=>{
    if(!req.body){
        res.status(400).send("No file choosing")
    }

    let file = req.body.imageurl
    return handleUpload(req, res, file)
})


module.exports = {
    router
}

