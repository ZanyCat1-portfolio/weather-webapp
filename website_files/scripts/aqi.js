let city = document.getElementById("city-current")

let indexSpan = document.getElementById("indexSpan")
let locationSpan = document.getElementById("locationSpan")
let timeSpan = document.getElementById("timeSpan")
let concernSpan = document.getElementById("concernSpan")

let indexDiv = document.getElementById("indexDiv")
let locationDiv = document.getElementById("locationDiv")
let timeDiv = document.getElementById("timeDiv")

async function getData(coords) {
    if (coords != 'error') {
        let values = coords
        if (values) {
            let lat = values.lat
            let lon = values.lon

            const queryString = `/geo:${lat};${lon}`;
            const aqiUrl = weatherProxyEndPoint +  aqiEndpoint + queryString
        
            const aqiResponse = await fetch(aqiUrl)
            if (!aqiResponse.ok) {
                throw new Error(`Response status: ${aqiResponse.status}`);
            }
            const json = await aqiResponse.json()
        
            let loc = json.data.city.name
            let aqi = json.data.aqi
            let myDate = new Date(json.data.time.s)
        
            locationSpan.innerText = 
                loc.split(',')[1] + ", " +
                loc.split(',').slice(-1)
            indexSpan.innerText = aqi
            timeSpan.innerText = 
                myDate.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + 
                myDate.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + 
                myDate.getSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2})
        
            let color
            let concern
            if (aqi <= 50) {
                color = 'green'
                concern = 'Good'
            }
            if (aqi > 50) {
                color = 'yellow'
                concern = 'Moderate'
            }
            if (aqi > 100) {
                color = 'orange'
                concern = 'Unhealthy for Sensitive Groups'
            }
            if (aqi > 150) {
                color = 'red'
                concern = 'Unhealthy'
            }
            if (aqi > 200) {
                color = 'purple'
                concern = 'Very Unhealthy'
            }
            if (json.data.aqi > 300) {
                color = 'maroon'
                concern = 'Hazardous'
            }
        
            concernSpan.innerText = concern
        
            indexDiv.setAttribute('style', `background-color: ${color}`)
        }
    }
    else {
        console.log('here?');
        concernSpan.innerText = `Unable to load city "${city.value}"`;
        locationSpan.innerText = "";
        timeSpan.innerText = "";
        indexDiv.setAttribute('style', 'background-color: pink');

    }
}