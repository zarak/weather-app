function displayLocation(position) {
  var API_KEY = "ec3d4205c1695db6";
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var h4Location = document.getElementById("location");
  var pCelsius = document.getElementById("celsius");
  var pFahrenheit = document.getElementById("fahrenheit");
  
  var geo_url = "https://api.wunderground.com/api/" + API_KEY + "/geolookup/q/" + latitude + "," + longitude + ".json";
  
  $.getJSON(geo_url,  function(json1) {
    h4Location.innerHTML += city + ", " + country;
    
    var weather_url = "https://api.wunderground.com/api/" + API_KEY + "/conditions/q/" + latitude + "," + longitude + ".json";
    
    $.getJSON(weather_url, function(json2) {
      var temp_c = JSON.stringify(json2.current_observation.temp_c);
      var temp_f = JSON.stringify(json2.current_observation.temp_f);
      
      pCelsius.innerHTML += temp_c + " C";
      $("#celsius").show();
      pFahrenheit.innerHTML += temp_f + " F";
      $("#fahrenheit").hide();
      var icon = JSON.stringify(json2.current_observation.icon_url);
      icon = icon.replace('http', 'https');
      $('#description').prepend('<img id="icon" src=' + icon + '>');
    })
  });
}

function displayError(error) {
  var errors = ["Unknown error", "Permission denied by user", "Position not available", "Timeout error"];
  var message = errors[error.code];
  console.warn("Error in getting your location: " + message, error.message);
}

window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  }
  else {
    alert("Sorry, this browser doesn't support geolocation!");
  }
  
  $("a").click(function(){
    $("#celsius").toggle();
    $("#fahrenheit").toggle();
  });
}
