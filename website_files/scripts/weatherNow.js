function currentBtnClick() {
   weatherNowDate.innerHTML = new Date().toDateString() + " " + new Date().toTimeString().split(' ')[0]

   const cityCurrent = document.getElementById("city-current").value.trim();

   cityCurrent.length === 0 ? showElement("error-value-city-current") : 0

   if (cityCurrent.length > 0) {
      showElement("current");
      hideElement("error-loading-city-current");
      showElement("loading-city-current");
      showMessage("loading-city-current", `Loading ${cityCurrent}...`);
      hideElement("results-city-current");
      
      getWeatherNow(cityCurrent, "city-current");
   }
}

async function getWeatherNow(city, cityId) {
   const queryString = "q=" + encodeURI(city) + ",US&units=imperial"; 
   const url = weatherProxyEndPoint + weatherEndpoint + "?" + queryString;

   const response = await fetch(url);

   hideElement("loading-" + cityId);

   if (response.ok) {
      // for current weather
      const jsonResult = await response.json();
      displayWeather(cityId, jsonResult);

      // for aqi
      coords = {'lat': jsonResult.coord.lat, 'lon': jsonResult.coord.lon};
      getData(coords);
      
   }
   else {
      const errorId = "error-loading-" + cityId;
      getData('error');
      showElement(errorId);
      showMessage(errorId, `Unable to load city "${city}".`);
   }
}

function displayWeather(cityId, jsonResult) {
   showElement("results-" + cityId);

   const cityName = jsonResult.name
   const countryName = jsonResult.sys.country
   cityCountry = cityName + ", " + countryName

   showMessage(`${cityId}-name`, cityCountry);
   showMessage(`${cityId}-temp`, Math.round(jsonResult.main.temp) + "&deg;")
   showImage(`${cityId}-image`, jsonResult.weather[0].main);
}