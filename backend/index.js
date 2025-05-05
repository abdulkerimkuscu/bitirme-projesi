const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./config/db.js')
const product = require('./routes/product.js')
const user = require('./routes/user.js')
const cloudinary = require('cloudinary').v2
dotenv.config();

cloudinary.config({ 
    cloud_name: "dqqwoupny", 
    api_key: 881972535982952, 
    api_secret: "Kdsws63tzD9KWSs2pRnTegRBdTs",
});

const app = express();

app.use(cors({
    origin: "http://localhost:3000", // frontend'in çalıştığı adres
    credentials: true
  }));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cookieParser());

app.use('/', product)
app.use('/', user)


db();
 
const PORT =  4000;  

app.listen(PORT, () => {
    console.log("server running on port 4000 ")
})


  