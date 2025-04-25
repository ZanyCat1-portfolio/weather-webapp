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
   // Create a URL to access the web API

   /* old config inside this block
   const queryString = "q=" + encodeURI(city) + ",US&units=imperial&appid=" + key2;
   const url = weatherEndpoint + "?" + queryString;

   const response = await fetch(url);
   old config inside this block*/


   // trying to send request to back end
   // then back end attaches key and sends to api
   // then delivers the response back here 

   const queryString = "q=" + encodeURI(city) + ",US&units=imperial"; 
   const url = weatherProxyEndPoint + weatherEndpoint + "?" + queryString;
   
   // console.log("now url is")
   // console.log(url)

   const response = await fetch(url);

   // console.log('now response is')
   // console.log(response)

   hideElement("loading-" + cityId);

   if (response.ok) {
      const jsonResult = await response.json();
      coords = {'lat': jsonResult.coord.lat, 'lon': jsonResult.coord.lon};
      getData(coords);
      displayWeather(cityId, jsonResult);
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