const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;  //ret: has to be that way: we don't want to send the password
      return ret;
    }
  }
});

// pre-hook : before you saved this to the database, check if password is new or updated: if so, encrypt.
userSchema.pre('save', async function(next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // the password is either new, or being updated
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model('User', userSchema);