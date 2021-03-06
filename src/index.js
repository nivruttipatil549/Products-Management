const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const multer = require("multer")

const { default: mongoose } = require('mongoose');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

//  Connect to mongoDB
mongoose.connect("mongodb+srv://pathakradhika02:xwz7d3tIw343fIrl@cluster0.4kdiu.mongodb.net/group33DB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


  
app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});