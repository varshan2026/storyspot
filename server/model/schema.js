const mongoose = require('mongoose');

storySchema = mongoose.Schema({
  title:{type:String, required:true},
  author:{type:String, required:true},
  category:{type:String, required: true},
  image:{type:String, required: true},
  script:{type:String, required:true}
  }, 
  {timestamps: true}
)

const story = mongoose.model('storyLog', storySchema);

module.exports = story;