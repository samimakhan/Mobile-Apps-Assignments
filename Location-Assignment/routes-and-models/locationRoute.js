const express = require("express");
const router = express.Router();
let mongoose = require('mongoose');
let Restaurant = require('./Restaurant.model');


let db = 'mongodb://localhost:27017/locations';
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true});
let mylocation = {
  location:" PECHS Block 2",
  latitude: 24.870783,
  longitude: 67.055585
};
router.get('/', function (req, res) {
  Restaurant.find({})
  .exec(function(err, restaurants){
    if(err) {
      res.send('error has occurred');
    } else{
      let queryResults = restaurants;
      let distanceDetails = [];
      queryResults.forEach(rest =>{
      let distance = getDistance(mylocation.latitude, mylocation.longitude, rest.latitude, rest.longitude);
      distanceDetails.push({"Name": rest.Name, "distance": distance});
      });
     distanceDetails.sort(compare);
      res.send({"Your location": mylocation.location, "Closest restaurants": distanceDetails});
    }
  });

});

const getDistance = (lat1, lon1, lat2, lon2) => { // get Distance in KM
  let theta = lon1 - lon2;
  let dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  
  return (dist);
}

const deg2rad = (deg) => {
  return (deg * Math.PI / 180.0);
}

const rad2deg = (rad) => {
  return (rad * 180.0 / Math.PI);
}

const compare = (a,b) =>{
  if ( a.distance < b.distance ){
    return -1;
  }
  if ( a.distance > b.distance ){
    return 1;
  }
  return 0;
}


module.exports = router;
  

