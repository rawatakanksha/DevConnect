const mongoose=require('mongoose')
const dns = require('dns');

// Force Node.js to use Google DNS (fixes querySrv ECONNREFUSED error)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDb= async ()=> {
    await mongoose.connect('mongodb+srv://rawatakanksha2313_db_user:Jv2PLpyJmA5kJXUY@nodedemo.lgvo9vj.mongodb.net/devConnect')
}

module.exports=connectDb