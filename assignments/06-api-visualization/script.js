let weatherData = document.querySelector("#weatherApiData");
let weatherGraph = document.querySelector("#weatherApiGraph");

async function getWeather() {
    let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=38.8951&longitude=-77.0364&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset&hourly=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m,weather_code&current=precipitation,is_day,temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch");
    let json = await response.json();
    return json;
}

async function showWeather() {
    try {
        let data = await getWeather();
        let current = data.current;
        let currentUnits = data.current_units;

        weatherData.innerHTML = `
        <p>Latitude: ${data.latitude}</p>
        <p>Longitude: ${data.longitude}</p>
        <p>Time: ${current.time}${currentUnits.time}</p>
        <p>Temperature: ${current.temperature_2m}${currentUnits.temperature_2m}</p>
        <p>Precipitation: ${current.precipitation}${currentUnits.precipitation}</p>
        <p>Wind Speed: ${current.wind_speed_10m}${currentUnits.wind_speed_10m}</p>
        <p>Humidity: ${current.relative_humidity_2m}${currentUnits.relative_humidity_2m}</p>`;
    }

    catch (err) {
        weatherData.textContent = "Couldn't Load Weather";
        console.error(err);
    }
}

async function showGraph() {
    try {

        const DATA_COUNT = 8;
        const COL_NUM = {count: DATA_COUNT, min: 0, max: 100};

        const labels = Utils.hours
        const data = {

        }

        const config = {
            type: "line",
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Open Meteo Api"
                    }
                }
            }
        }
    }

    catch (err) {
        weatherGraph.textContent = "Couldn't Load Graph";
        console.error(err);
    }
}

showGraph();
showWeather();