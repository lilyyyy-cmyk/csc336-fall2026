//div variables
let weatherSketch = document.querySelector("#p5Sketch");
let weatherData = document.querySelector("#weatherApiData");
let weatherGraph = document.querySelector("#weatherApiGraph");
let weatherChart = document.querySelector("#weatherChart"); //canvas variable

let weatherMode = "clear"; //initial assignment for weatherMode
let dayCycle = "day";

async function getWeather() { //fetches open-meteo data I specified
    let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=38.8951&longitude=-77.0364&daily=temperature_2m_min,temperature_2m_max,weather_code,daylight_duration&hourly=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m,weather_code&current=precipitation,is_day,temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
    let json = await response.json(); //jsonifies the data
    return json; //returns jsonified data
}

async function showWeather() {
    try { //no error
        let data = await getWeather(); //calls fetch function
        let current = data.current; //stores current weather data
        let currentUnits = data.current_units; //units of current weather data

        //lists some stored data with units
        weatherData.innerHTML = `
        <h3>Current Weather Data</h3>
        <p>Latitude: ${data.latitude}</p>
        <p>Longitude: ${data.longitude}</p>
        <p>Time: ${current.time} ${currentUnits.time}</p>
        <p>Temperature: ${current.temperature_2m} ${currentUnits.temperature_2m}</p>
        <p>Precipitation: ${current.precipitation} ${currentUnits.precipitation}</p>
        <p>Wind Speed: ${current.wind_speed_10m} ${currentUnits.wind_speed_10m}</p>
        <p>Humidity: ${current.relative_humidity_2m} ${currentUnits.relative_humidity_2m}</p>
        <p>Weather Code: ${current.weather_code} ${currentUnits.weather_code}</p>`;
    }

    catch (err) { //error
        weatherData.textContent = "Couldn't Load Weather";
        console.error(err);
    }
}

async function isDay() {
    try {
        let data = await getWeather();
        let day = data.current.is_day;

        if (day === 1) dayCycle = "day";
        else dayCycle = "night";
    }
    
    catch (err) {
        weatherSketch.textContent = "Couldn't Load Sketch";
        console.error(err);
    }
}

async function showWeatherCode() {
    try {
        let data = await getWeather();
        let code = data.current.weather_code; //stores current weather_code data

        //shortened if/else statements for more clarity in the draw() function
        if (code === 0) weatherMode = "clear";
        else if (code > 0 && code <= 3) weatherMode = "overcast";
        else if (code >= 51 && code <= 55) weatherMode = "drizzle";
        else if (code >= 61 && code <= 65) weatherMode = "rain";
        else weatherMode = "overcast"; //only specified some codes, there's too many
    }
    
    catch (err) {
        weatherSketch.textContent = "Couldn't Load Sketch";
        console.error(err);
    }
}

async function showGraph() {
    try {
        let data = await getWeather();
        let hourly = data.hourly; //stores hourly data
        let hourlyUnits = data.hourly_units; //hourly data units

        
        const COUNT = 9; //amount of times shown
        const STEP = 3; //step amount for hours

        //function that filters through hours by the step amount, starts from 0-COUNT value
        const everyThird = (time) => time.filter((_, i) => i % STEP === 0).slice(0, COUNT);
        const labels = everyThird(hourly.time).map(t => t.slice(11)); //gets rid of unnecessary characters

        const weather = { //weather data for graph
            labels: labels,
            datasets: [
                {
                    label: `Temperature ${hourlyUnits.temperature_2m}`, //label with units
                    data: everyThird(hourly.temperature_2m), //stepped hourly data
                    borderColor: "rgba(0, 255, 0, 1)", //legend border color
                    backgroundColor: "rgba(0, 255, 0, 0.5)", //legend background color
                },
                {
                    label: `Wind Speed ${hourlyUnits.wind_speed_10m}`,
                    data: everyThird(hourly.wind_speed_10m),
                    borderColor: "rgba(128, 0, 255, 1)",
                    backgroundColor: "rgba(128, 0, 255, 0.5)",
                },
                {
                    label: `Precipitation ${hourlyUnits.precipitation}`,
                    data: everyThird(hourly.precipitation),
                    borderColor: "rgba(0, 0, 255, 1)",
                    backgroundColor: "rgba(0, 0, 255, 0.5)",
                },
                {
                    label: `Humidity ${hourlyUnits.relative_humidity_2m}`,
                    data: everyThird(hourly.relative_humidity_2m),
                    borderColor: "rgba(255, 255, 0, 1)",
                    backgroundColor: "rgba(255, 255, 0, 0.5)",
                },
                {
                    label: `Weather Code ${hourlyUnits.weather_code}`,
                    data: everyThird(hourly.weather_code),
                    borderColor: "rgba(255, 0, 255, 1)",
                    backgroundColor: "rgba(255, 0, 255, 0.5)",
                }
            ]
        }

        const config = { //configures the chart
            type: "line", //line chart
            data: weather, //takes data from previously defined
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top", //puts legend at the top
                    },
                    title: {
                        display: true,
                        text: "Open-Meteo Api Hourly Data" //title of chart
                    }
                }
            }
        };
        Chart.defaults.font.family = "'Lucida Console'"; //changes font for entire chart
        new Chart(weatherChart, config); //creates config in specified canvas
    }

    catch (err) {
        weatherGraph.textContent = "Couldn't Load Graph";
        console.error(err);
    }
}

//function calls
showWeather();
isDay();
showWeatherCode();
showGraph();