const mongoose = require("mongoose");


const DB ="mongodb+srv://chetanakhara:chetan2001@cluster0.q7bqz.mongodb.net/cruddata?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));