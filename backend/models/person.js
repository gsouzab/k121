const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  friend: {
    name: String,
    email: String
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;