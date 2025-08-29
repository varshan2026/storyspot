const mongoose = require('mongoose');

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to Database....')
  }catch(error){
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB;