const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Sanskar:Sanskar%40123@sanskar.eurcdyh.mongodb.net/test"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connector to Mongo Succesfully")
    })
}

module.exports= connectToMongo;