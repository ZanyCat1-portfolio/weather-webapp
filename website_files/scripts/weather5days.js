function forecastBtnClick() {
   // weather5DayDate.innerHTML = new Date().toDateString() + " " + new Date().toTimeString().split(' ')[0]

   const city = document.getElementById("city-current").value.trim();

   city.length === 0 ? showElement("error-value-city") : 0

   if (city.length > 0) {
      showElement("forecast");
      hideElement("error-loading-city");
      showElement("loading-city");
      showMessage("loading-city", `Loading ${city-current}...`);
      hideElement("results-city");
      
      getWeatherForecast(city, "city");
   }
}

async function getWeatherForecast(city, cityId) {
   // Create a URL to access the web API
   const queryString = "q=" + encodeURI(city) + ",US&units=imperial";
   const url = weatherProxyEndPoint + forecastEndpoint + "?" + queryString;

   console.log("5day url is")
   console.log(url)

   const response = await fetch(url);

   console.log('5day response is')
   console.log(response)

   hideElement("loading-" + cityId);

   if (response.ok) {
      const jsonResult = await response.json();
      displayForecast(cityId, jsonResult);
   }
   else {
      const errorId = "error-loading-" + cityId;
      showElement(errorId);
      showMessage(errorId, `Unable to load city "${city}".`);
   }
}

function displayForecast(cityId, jsonResult) {
   showElement("results-" + cityId);

   const cityName = jsonResult.city.name
   const countryName = jsonResult.city.country
   cityCountry = cityName + ", " + countryName
   // showMessage(cityId + "-name", cityCountry);

   const forecastMap = getSummaryForecast(jsonResult.list);

   let day = 0;
   for (const date in forecastMap) {
      if (day <= 5) {
         const dayForecast = forecastMap[date];
         showMessage(`${cityId}-day${day}-name`, getDayName(date));
         showMessage(`${cityId}-day${day}-high`, Math.round(dayForecast.high) + "&deg;");
         showMessage(`${cityId}-day${day}-low`, Math.round(dayForecast.low) + "&deg;");
         showImage(`${cityId}-day${day}-image`, dayForecast.weather);
         if (dayForecast.weather == "Rain" || dayForecast.weather == "Snow") {
            showMessage(`${cityId}-day${day}-pop`, (dayForecast.pop * 100) + '%');
         }
      day++;
      }
   }
}

// Return a map of objects with high, low, weather properties
function getSummaryForecast(forecastList) {
   const forecast5day = {};
   forecastList.forEach(function (item) {
      // Extract just the yyyy-mm-dd 
      const date = item.dt_txt.substr(0, 10);
      
      const temp = item.main.temp;

      if (date in forecast5day) {
         temp < forecast5day[date].low ? forecast5day[date].low = temp : 0
         temp > forecast5day[date].high ? forecast5day[date].high = temp : 0
      }
      else {
         const temps = {
            high: temp,
            low: temp,
            weather: item.weather[0].main,
            pop: item.pop
         }         
         forecast5day[date] = temps;
      }
   });
   
   return forecast5day;
}