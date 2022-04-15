let mongoose = require('mongoose')

const zooSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        latin_name: String,
        animal_type: String,
        active_time: String,
        length_min: String,
        length_max: String,
        weight_min: String,
        weight_max: String,
        lifespan: String,
        habitat: String,
        diet: String,
        geo_range: String,
        image_link: String,
        id: Number
      },
      {collection: 'zooanimals'}
)

const zooCol = mongoose.model('zooAnimal', zooSchema)
module.exports = zooCol