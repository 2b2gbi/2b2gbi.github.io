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
  let weatherState = document.getElementById('state');
  let temperatureSection = document.getElementById('temperature');
  let temperatureUnit = document.getElementById('unit-display');
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const weatherapi = `${proxy}https://api.darksky.net/forecast/dabc8fd40d6b6b4b8ad61286125025d1/${lat},${long}`;
  const locationapi = `${proxy}https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${lat}%2C${long}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=yHr3fcUxWfT1SP5vX5GU&app_code=rIqVZg5zXFqu4Qmjd0-kaQ`;
  
  fetch(weatherapi)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const {temperature, summary, icon} = data.currently;
      // Set DOM Elements from the API
      temperatureDegree.innerHTML = Math.round(temperature);
      temperatureDescription.innerHTML = summary;
      let celsius = (temperature -32) * (5 / 9)
      setIcons(icon, document.getElementById('icon'));
      temperatureSection.addEventListener('click', () =>{
        if(temperatureUnit.innerHTML === "F"){
          temperatureUnit.innerHTML = "C";
          temperatureDegree.innerHTML = Math.round(celsius);
        } else {
          temperatureUnit.innerHTML = "F";
          temperatureDegree.innerHTML = Math.round(temperature);
        }
      })
    })

  fetch(locationapi)
  .then(response => {
    return response.json();
  })
  .then(locdata => {
    const {City} = locdata.Response.View[0].Result[0].Location.Address  //Response.View[""0""].Result[""0""].Location.Address Response.View[""0""].Result[""0""].Location.Address.AdditionalData[""0""].value
    weatherLocation.innerHTML = City;
    weatherState.innerHTML = locdata.Response.View[0].Result[0].Location.Address.AdditionalData[1].value + ",&nbsp;" + locdata.Response.View[0].Result[0].Location.Address.AdditionalData[0].value;
  })
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

function setIcons (icon, iconID){
  const skycons = new Skycons({color:"white"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}