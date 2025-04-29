const mongoose = require('mongoose');

const db = () => {
    mongoose.connect('mongodb+srv://kuscu2708:12345@cluster0.ytiwbzv.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log("MongoDB connected!");
        
    }).catch((err) =>{
        console.log(err); 
        
    })
}

module.exports = db;