const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { stringify } = require('querystring');

const schema = new mongoose.Schema({
    id: String,
    cropped_picture: String,
    name: String,
    type: String,
    size: String,
    camera: String,
    author: String,
    description: String
});

schema.plugin(timestamp);
module.exports = mongoose.model('photo', schema, 'photo');