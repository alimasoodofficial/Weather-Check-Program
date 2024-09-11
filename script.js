const weatherForm = document.querySelector('.weatherForm')
const CityInput = document.querySelector('#cityInput')
const weatherCard = document.querySelector('.WeatherCard')
const apiKey = 'd38d67402796dcb7f9926b7e840ddb7d'

weatherForm.addEventListener('submit', async event => {
    event.preventDefault()
    const city = CityInput.value;
    if (city) {

        try {
            const weatherData = await getWeatherData(city)
            DisplayWeatherInfo(weatherData)
        }
        catch (error) {
            console.error("222", error)
            displayError(error.message)
        }

    }
    else {
        displayError('Please Enter a city')

    }

})


async function getWeatherData(city) {
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(APIurl)
    // console.log(await response.json())
    if (!response.ok) {
        throw new Error("City Not Found⁉️")
    }
    return await response.json();
}

function DisplayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    weatherCard.textContent = '';
    // weatherCard.style.display = 'flex';
    const cityDisplay = document.createElement('h1')
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descDisplay = document.createElement('p')
    const weatherEmoji = document.createElement('p')

    cityDisplay.className = 'Display-1 d-flex justify-content-center fw-bold  p-1 pt-3 m-0';
    tempDisplay.className = 'd-flex justify-content-center p-1 m-0 fw-bold display-1 color-blue-grad';
    humidityDisplay.className = 'd-flex justify-content-center fw-bold p-1 m-0';
    descDisplay.className = 'd-flex justify-content-center text-primary fw-bold p-1 m-0';
    weatherEmoji.className = 'd-flex justify-content-center p-1 m-0 display-1';

    cityDisplay.textContent = city;
    weatherCard.appendChild(cityDisplay)
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    weatherCard.appendChild(tempDisplay)
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    weatherCard.appendChild(humidityDisplay)
    descDisplay.textContent = description;
    weatherCard.appendChild(descDisplay)
    weatherEmoji.textContent = DisplayWeatherEmoji(id);
    weatherCard.appendChild(weatherEmoji)





}

function DisplayWeatherEmoji(WeatherID) {

    switch (true) {
        case (WeatherID >= 200 && WeatherID < 300):
            return "⛈️"
        case (WeatherID >= 300 && WeatherID < 400):
            return '🌧️'
        case (WeatherID >= 500 && WeatherID < 600):
            return '🌧️'
        case (WeatherID >= 600 && WeatherID < 700):
            return '❄️'
        case (WeatherID >= 700 && WeatherID < 800):
            return '🌫️'
        case (WeatherID == 800):
            return '☀️'
        case (WeatherID >= 801 && WeatherID < 810):
            return '☁️'
        default:
            return "❓"
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p")
    errorDisplay.className = 'errorDisplay d-flex pt-3 m-0 fs-4 fw-bold';
    errorDisplay.textContent = message
    weatherCard.textContent = ''
    weatherCard.appendChild(errorDisplay)


}


