let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RestaurantSchema = new Schema({
    Name: String,
    location: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);