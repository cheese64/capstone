let mongoose = require('mongoose')

const catSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        breeds: Array,
        id: String,
        url: String,
        width: Number,
        height: Number
      },
      {collection: 'cats'}
)

const catCol = mongoose.model('Cat', catSchema)
module.exports = catCol