function displayLocation(position) {
  var API_KEY = "ec3d4205c1695db6";
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var h4Location = document.getElementById("location");
  var pCelsius = document.getElementById("celsius");
  var pFahrenheit = document.getElementById("fahrenheit");
  
  var geo_url = "https://api.wunderground.com/api/" + API_KEY + "/geolookup/q/" + latitude + "," + longitude + ".json";
  
  $.getJSON(geo_url,  function(json1) {
    var city = json1.location.city;
    var country = json1.location.country_name;
    var request_url = json1.location.requesturl;
    console.log(request_url);
    
    h4Location.innerHTML += city + ", " + country;
    
    var weather_url = "https://api.wunderground.com/api/ec3d4205c1695db6/conditions/q/" + latitude + "," + longitude + ".json";
    
    $.getJSON(weather_url, function(json2) {
      console.log(typeof(json2));
      var temp_c = Math.round(json2.current_observation.temp_c);
      var temp_f = Math.round(json2.current_observation.temp_f);
      
      var dict = {};
      dict.flurries = "wi-snow";
      dict.clear = "wi-day-sunny";
      dict.hazy = "wi-day-haze";
      dict.partlycloudy = "wi-day-sunny-overcast";
      dict.chanceflurries = "wi-day-snow";
      dict.mostlycloudy = "wi-day-cloudy-high";
      dict.chancerain = "wi-day-rain";
      dict.cloudy = "wi-cloudy";
      dict.mostlysunny = "wi-day-sunny-overcast"; 
      dict.snow = "wi-snow";
      dict.chancesleet = "wi-day-sleet";
      dict.sunny = "wi-day-sunny";
      dict.chancesnow = "wi-day-snow";
      dict.fog = "wi-day-fog";
      dict.partlysunny = "wi-day-cloudy-high";
      dict.tstorms = "wi-thunderstorm";
      dict.chancetstorms = "wi-day-thunderstorm";
      dict.rain = "wi-rain";
      dict.unknown = "wi-na";
      
      dict.nt_flurries = "wi-snow";
      dict.nt_clear = "wi-night-sunny";
      dict.nt_hazy = "wi-night-haze";
      dict.nt_partlycloudy = "wi-night-sunny-overcast";
      dict.nt_chanceflurries = "wi-night-snow";
      dict.nt_mostlycloudy = "wi-night-cloudy-high";
      dict.nt_chancerain = "wi-night-rain";
      dict.nt_cloudy = "wi-cloudy";
      dict.nt_mostlysunny = "wi-night-sunny-overcast"; 
      dict.nt_snow = "wi-snow";
      dict.nt_chancesleet = "wi-night-sleet";
      dict.nt_sunny = "wi-night-sunny";
      dict.nt_chancesnow = "wi-night-snow";
      dict.nt_fog = "wi-night-fog";
      dict.nt_partlysunny = "wi-night-cloudy-high";
      dict.nt_tstorms = "wi-thunderstorm";
      dict.nt_chancetstorms = "wi-night-thunderstorm";
      dict.nt_rain = "wi-rain";
      dict.nt_unknown = "wi-na";
      
      $('#celsius').html(temp_c); 
      $('#celsius').append('<i class="wi wi-celsius"></i>'); 
      $("#celsius").show();
      $('#fahrenheit').html(temp_f); 
      $('#fahrenheit').append('<i class="wi wi-fahrenheit"></i>'); 
      $("#fahrenheit").hide();
      var icon = (json2.current_observation.icon);
      $('#weather-icon').prepend('<i class="wi ' + dict[icon] + '"></i>');
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
