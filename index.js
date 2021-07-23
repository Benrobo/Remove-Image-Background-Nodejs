const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs')

app.set("view engine", "ejs");
const {router} = require('./routes/router')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/views')));

app.get("/", (req, res) => {
    res.render("index")
})

app.use(router)

const port = process.env.PORT || 5000

app.listen(port)