let weatherData = document.querySelector("#weatherApiData");
let weatherGraph = document.querySelector("#weatherApiGraph");
let weatherChart = document.querySelector("#weatherChart");

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

async function showGraph() {
    try {
        let data = await getWeather();
        let hourly = data.hourly;
        let hourlyUnits = data.hourly_units;

        
        const COUNT = 4;
        const STEP = 6;

        const everySixth = (time) => time.filter((_, i) => i % STEP === 0).slice(0, COUNT);
        const labels = everySixth(hourly.time).map(t => t.slice(11));

        const weatherData = {
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
            data: weatherData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Open-Meteo Api Data"
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

showGraph();
showWeather();