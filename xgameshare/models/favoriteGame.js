const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteGameSchema = new Schema({   
    igdb_game_id: { type: Number, required: true },
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
  