var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: { type: String},
    firstname: { type: String},
    lastname: { type: String},
    userid: { type: String, index: { unique: true } },
    email: { type: String, unique: true },
    picture: {type: String, default: "http://placehold.it/800x200"},
    location: {type: String},
    dateCreated: { type: Date, default: Date.now() }
}, {collection: 'user'});

module.exports = userSchema;