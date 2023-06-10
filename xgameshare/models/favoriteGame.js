const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteGameSchema = new Schema({
    name: { type: String, required: true },
    story_line: { type: String},
    summary: { type: String  }, 
    avg_rating: {  type: Number, default: -1, },
    cover_url: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  },
  {
    timestamps: true,  
   }
  );

  module.exports = mongoose.model('FavoriteGame', favoriteGameSchema);
  