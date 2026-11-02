let weatherSketch = document.querySelector("#p5Sketch");
let weatherData = document.querySelector("#weatherApiData");
let weatherGraph = document.querySelector("#weatherApiGraph");
let weatherChart = document.querySelector("#weatherChart");

let weatherMode = "clear";

async function getWeather() {
    let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=38.8951&longitude=-77.0364&daily=temperature_2m_min,temperature_2m_max,weather_code,daylight_duration&hourly=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m,weather_code&current=precipitation,is_day,temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
    let json = await response.json();
    return json;
}

async function showWeather() {
    try {
        let data = await getWeather();
        let current = data.current;
        let currentUnits = data.current_units;

        weatherData.innerHTML = `
        <h3>Current Weather Data</h3>
        <p>Latitude: ${data.latitude}</p>
        <p>Longitude: ${data.longitude}</p>
        <p>Time: ${current.time} ${currentUnits.time}</p>
        <p>Temperature: ${current.temperature_2m} ${currentUnits.temperature_2m}</p>
        <p>Precipitation: ${current.precipitation} ${currentUnits.precipitation}</p>
        <p>Wind Speed: ${current.wind_speed_10m} ${currentUnits.wind_speed_10m}</p>
        <p>Humidity: ${current.relative_humidity_2m} ${currentUnits.relative_humidity_2m}</p>`;
    }

    catch (err) {
        weatherData.textContent = "Couldn't Load Weather";
        console.error(err);
    }
}

async function showWeatherCode() {
    try {
        let data = await getWeather();
        let code = data.hourly.weather_code;

        if (code === 0) weatherMode = "clear";
        else if (code > 0 && code <= 3) weatherMode = "overcast";
        else if (code >= 51 && code <= 55) weatherMode = "drizzle";
        else if (code >= 61 && code <= 65) weatherMode = "rain";
    }
    
    catch (err) {
        weatherSketch.textContent = "Couldn't Load Sketch";
        console.error(err);
    }
}

async function showGraph() {
    try {
        let data = await getWeather();
        let hourly = data.hourly;
        let hourlyUnits = data.hourly_units;

        
        const COUNT = 9;
        const STEP = 3;

        const everySixth = (time) => time.filter((_, i) => i % STEP === 0).slice(0, COUNT);
        const labels = everySixth(hourly.time).map(t => t.slice(11));

        const weather = {
            labels: labels,
            datasets: [
                {
                    label: `Temperature ${hourlyUnits.temperature_2m}`,
                    data: everySixth(hourly.temperature_2m),
                    borderColor: "rgba(0, 255, 0, 1)",
                    backgroundColor: "rgba(0, 255, 0, 0.5)",
                },
                {
                    label: `Wind Speed ${hourlyUnits.wind_speed_10m}`,
                    data: everySixth(hourly.wind_speed_10m),
                    borderColor: "rgba(128, 0, 255, 1)",
                    backgroundColor: "rgba(128, 0, 255, 0.5)",
                },
                {
                    label: `Precipitation ${hourlyUnits.precipitation}`,
                    data: everySixth(hourly.precipitation),
                    borderColor: "rgba(0, 0, 255, 1)",
                    backgroundColor: "rgba(0, 0, 255, 0.5)",
                },
                {
                    label: `Humidity ${hourlyUnits.relative_humidity_2m}`,
                    data: everySixth(hourly.relative_humidity_2m),
                    borderColor: "rgba(255, 255, 0, 1)",
                    backgroundColor: "rgba(255, 255, 0, 0.5)",
                },
                {
                    label: `Weather Code ${hourlyUnits.weather_code}`,
                    data: everySixth(hourly.weather_code),
                    borderColor: "rgba(255, 0, 255, 1)",
                    backgroundColor: "rgba(255, 0, 255, 0.5)",
                }
            ]
        }

        const config = {
            type: "line",
            data: weather,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Open-Meteo Api Hourly Data"
                    }
                }
            }
        };
        Chart.defaults.font.family = "'Lucida Console'";
        new Chart(weatherChart, config);
    }

    catch (err) {
        weatherGraph.textContent = "Couldn't Load Graph";
        console.error(err);
    }
}

showWeather();
showWeatherCode();
showGraph();