window.addEventListener('load', ()=> {
    if(navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(position, showError);
        
    } else {
        errorMsg.innerHTML = "Location services supported by your browser."
    }
})
    
function position(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let temperatureDescription = document.getElementById('temperature-description');
  let temperatureDegree = document.getElementById('temp-display');
  let weatherLocation = document.getElementById('loc');
  console.log(lat);
  console.log(long);
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const weatherapi = `${proxy}https://api.darksky.net/forecast/dabc8fd40d6b6b4b8ad61286125025d1/${lat},${long}`;
  console.log(weatherapi);
  
  fetch(weatherapi)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      const {temperature, summary, timezone} = data.currently;
      // Set DOM Elements from the API
      temperatureDegree.innerHTML = Math.round(temperature);
      temperatureDescription.innerHTML = summary;
      weatherLocation.innerHTML = timezone;
    })
  
    var platform= new H.service.Platform({
      'apikey':'{jOxBIE4MGMGxcwBqkxS--gZXWNps_2kckhyL6gN6YJ0}'
    });

  var reverseGeocodingParameters = {
    prox: `${lat},${long}`,
    mode: 'retrieveAddresses',
    maxresults: 1
  };

  function onSuccess(result) {
    var location = result.Response.View[0].Result[0];
  };

  var geocoder = platform.getGeocodingService();

  geocoder.reverseGeocode(
    reverseGeocodingParameters,
    onSuccess,
    function(e) { alert(e); });

}
    
function showError(error) {
      let errorMsg = document.getElementById("error-message")
      switch(error.code) {
        case error.PERMISSION_DENIED:
         errorMsg.innerHTML = "You need to turn on location access for this to work.";
         document.getElementById("noGeo").classList.add("show");
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg.innerHTML = "Your location is unavailable.";
          document.getElementById("noGeo").classList.add("show");
          break;
        case error.TIMEOUT:
          errorMsg.innerHTML = "We tried to get your location, but the request timed out.";
          document.getElementById("noGeo").classList.add("show");
          break;
        case error.UNKNOWN_ERROR:
          alert("There was an unknown error finding your location.");
          document.getElementById("noGeo").classList.add("show");
          break;
    }
}