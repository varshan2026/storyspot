const story = require('../model/schema');

const postStory = async(req, res) => {
  const {title, author, category, imageUrl, script} = req.body

  try{
    const newstory = new story({title, author, category, image:imageUrl, script})
    if(!newstory){
      res.status(400).json('Unable to get data from client side')
    }
    await newstory.save()
    res.status(200).json(newstory)
  }
  catch(e){
    res.status(500).json(e.message)
    console.log(e.message)
  }
}

const getStory = async(req, res) => {
  try{
    const readstory = await story.find()
    if(!readstory){
      res.status(400).json('Data not found')
    }
    res.status(200).json(readstory)
  }catch(e){
    res.status(500).json(e.message)
  }
}

const getStoryId = async(req, res) => {
  try{
    const readstoryId = await story.findById(req.params._id);
    if(!readstoryId){
      res.status(400).json('Data not found')
    }
    res.status(200).json(readstoryId)
  }
  catch(e){
    res.status(500).json(e.message)
  }
}

const updateStory = async(req, res) => {
  try{
    const modifystory = await story.findById(req.params._id);
    modifystory.title = req.body.title || modifystory.title;
    modifystory.author = req.body.author || modifystory.author;
    modifystory.category = req.body.category || modifystory.category;
    modifystory.image = req.body.image || modifystory.image;
    modifystory.script = req.body.script || modifystory.script;
    modifystory.updatedAt = Date.now()

    await modifystory.save()
    res.status(200).json('story updated....')
  }
  catch(e){
    res.status(500).json(e.message)
  }
}

const deleteStory = async(req, res) => {
  try{
    await story.findOneAndDelete(req.params._id);
    res.status(200).json('story Deleted')
  }catch(e){
    res.status(500).json(e.message)
  }
}

module.exports = {postStory, getStory, getStoryId, updateStory, deleteStory}