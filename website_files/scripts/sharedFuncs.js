// this is how we move between production and development
   // /weather-api/ is production
   // http:... is development
   const weatherProxyEndPoint = "/weather-api/";
   // const weatherProxyEndPoint = "http://192.168.4.237:8077/";

const weatherEndpoint = "openweathermap.org/data/2.5/weather";
const forecastEndpoint = "openweathermap.org/data/2.5/forecast";
const aqiEndpoint = "waqi.info/feed"

weatherNowDate = document.getElementById("now-city-current")

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
   document.getElementById("city-current").addEventListener("input", cityInput);
   document.getElementById("currentBtn").addEventListener("click", currentBtnClick);
   document.getElementById("currentBtn").addEventListener("click", getWeatherForecasts);
}

function cityInput(e) {
   // Extract the text from city input that triggered the callback
   const cityId = e.target.id;
   const cityCurrent = document.getElementById(cityId).value.trim();
   
   // Only show error message if no city 
   cityCurrent.length === 0 ? showElement("error-value-" + cityId) : hideElement("error-value-" + cityId)
}

// Convert date string into Mon, Tue, etc.
function getDayName(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}
 
 // Show the element
function showElement(elementId) {
   document.getElementById(elementId) ? document.getElementById(elementId).classList.remove("hidden") : 0
}
 
 // Hide the element
function hideElement(elementId) {
   document.getElementById(elementId) ? document.getElementById(elementId).classList.add("hidden") : 0
}
 
// Display the message in the element
function showMessage(elementId, message) {
   document.getElementById(elementId).innerHTML = message
}
 
 // Show the weather image that matches the weatherType
function showImage(elementId, weatherType) {   
   // Images for various weather types
   const weatherImages = {
      Clear: "clear.png",
      Clouds: "clouds.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png",
      Rain: "rain.png",
      Snow: "snow.png"
   };

   const localWeatherImages = {
       Haze: "scripts/haze.png"
   };
   const img = document.getElementById(elementId);

   if (weatherImages[weatherType]) {
       const imgUrl = "https://s3-us-west-2.amazonaws.com/static-resources.zybooks.com/";
       img.src = imgUrl + weatherImages[weatherType] 
   } else {
       img.src = localWeatherImages[weatherType]
   }
   img.alt = weatherType
}