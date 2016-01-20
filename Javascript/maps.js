$(document).ready(function(){

// API key for directions: AIzaSyBvAv8c1uklnR-jBM-bvwgjI6RVplTeFkI 

// https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJ21sxMYZU2YARHV9p7eVlD0w&destination=place_id:ChIJKy7GIiH324ARrN_4RHsOjo8&key=AIzaSyBvAv8c1uklnR-jBM-bvwgjI6RVplTeFkI&arrival_time=1443883500

// initMap();




});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 32.7315206, lng: -117.1299825}
  });

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}