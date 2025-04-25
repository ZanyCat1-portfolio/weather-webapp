function getWeatherForecasts() {
   // weatherHourlyDate.innerHTML = new Date().toDateString() + " " + new Date().toTimeString().split(' ')[0]

   const cityHourly = document.getElementById("city-current").value.trim();
   const city = document.getElementById("city-current").value.trim();

   cityHourly.length === 0 ? showElement("error-value-city-hourly") : 0

   if (cityHourly.length > 0) {
      showElement("hourly");
      hideElement("error-loading-city-hourly");
      showElement("loading-city-hourly");
      showMessage("loading-city-hourly", `Loading ${cityHourly}...`);
      hideElement("results-city-hourly");

      showElement("forecast");
      hideElement("error-loading-city");
      showElement("loading-city");
      showMessage("loading-city", `Loading ${city}...`);
      hideElement("results-city");
      
      getForecasts(cityHourly, "city-hourly", "city");
   }
}

async function getForecasts(city, cityId, cityIdX) {
   // Create a URL to access the web API
   const queryString = "q=" + encodeURI(city) + ",US&units=imperial";
   const url = weatherProxyEndPoint + forecastEndpoint + "?" + queryString;

   const response = await fetch(url);

   hideElement("loading-" + cityId);
   hideElement("loading-" + cityIdX);

   if (response.ok) {
      const jsonResult = await response.json();
      displayHourly(cityId, jsonResult);
      displayForecast(cityIdX, jsonResult);
   }
   else {
      const errorId = "error-loading-" + cityId;
      const errorIdX = "error-loading-" + cityIdX;
      showElement(errorId);
      showMessage(errorId, `Unable to load city "${city}".`);
      showMessage(errorIdX, `Unable to load city "${city}".`);
   }
}

function displayHourly(cityId, jsonResult) {
   showElement("results-" + cityId);

   const cityName = jsonResult.city.name
   const countryName = jsonResult.city.country
   cityCountry = cityName + ", " + countryName

   // showMessage(cityId + "-name", cityCountry);

   const hourlyMap = getSummaryHourly(jsonResult.list);

   let time = 0
   let offset = jsonResult.city.timezone / 3600
   for (const hour in hourlyMap) { 
      timeForecast = new Date(jsonResult.list[time].dt_txt)
      timeForecast = new Date(timeForecast.setHours(timeForecast.getHours() + offset)).getHours()
      amOrPm = timeForecast >= 12 ? 'p.m.' : 'a.m.'
      timeForecast %= 12
      timeForecast === 0 ? timeForecast = 12 : 0

      showMessage(`${cityId}-time${time}-name`, timeForecast + " " + amOrPm)
      showMessage(`${cityId}-temp${time}-name`, Math.round(hourlyMap[hour].temp) + "&deg;")
      showImage(`${cityId}-image${time}-name`, hourlyMap[hour].weather )
      if (hourlyMap[hour].weather == "Rain" || hourlyMap[hour].weather == "Snow") {
         showMessage(`${cityId}${time}-pop`, (hourlyMap[hour].pop * 100) + '%');
      }

      time++
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
      }
      day++;
   }
}

// Return a map of objects with high, low, weather properties
function getSummaryHourly(hourlyList) {
   const forecastHourly = {}
   hourlyList.forEach(function (item) {
      // Extract just the yyyy-mm-dd 
      const date = item.dt_txt.substr(11)

      const temps = {
         temp: item.main.temp,
         weather: item.weather[0].main,
         pop: item.pop
      }
      forecastHourly[date] = temps
   });
   
   return forecastHourly
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
            weather: item.weather[0].main
         }         
         forecast5day[date] = temps;
      }
   });
   
   return forecast5day;
}