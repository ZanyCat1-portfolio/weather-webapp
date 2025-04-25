async function display5Day(cityId, jsonResult) {
   showElement("results-" + cityId);

   const cityName = jsonResult.city.name
   const countryName = jsonResult.city.country
   cityCountry = cityName + ", " + countryName

   const forecastMap = getSummaryForecast(jsonResult);

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
function getSummaryForecast(forecast) {
   offset = forecast.city.timezone / 3600
   forecastList = forecast.list

   const tempFiveDaysFromToday = new Date()
   tempFiveDaysFromToday.setDate(tempFiveDaysFromToday.getDate() + 5)
   const fiveDaysFromToday = tempFiveDaysFromToday.toDateString()
   const forecast5day = {};


   for (item of forecastList) {
      const gmtDateString = `${item.dt_txt.substr(0,10)}T${item.dt_txt.substr(11)}` 

      localDate = new Date(gmtDateString)
      localDate = new Date(localDate.setHours(localDate.getHours() + offset))

      if (daysApart(localDate, fiveDaysFromToday) > 0) {
         
         const date = localDate.toLocaleDateString()
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
      } else {
         break;
      }

   }
   return forecast5day;
}

function daysApart(startDate, endDate) {
   let start = new Date(startDate)
   let end = new Date(endDate)
   let timeDifference = end - start;
   let daysDifference = timeDifference / (1000 * 3600 * 24)
   return daysDifference
}