import './style.css'

let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=&appid=02f48485583adfe6c9f0547954991b91&units=metric`;

const container = document.getElementById("container");

function weatherConditionFactory(
  temp,
  feels_like,
  humidity,
  wind_speed,
  pressure
) {
  return {
    temp: temp,
    feels_like: feels_like,
    humidity: humidity,
    wind_speed: wind_speed,
    pressure: pressure,
  };
}

async function getWeatherData(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      if (response.status === 404) {
        console.warn("City not found (404).");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

async function getAppropriateData(city) {
  openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02f48485583adfe6c9f0547954991b91&units=metric`;
  const dataRaw = await getWeatherData(openWeatherUrl);

  if (!dataRaw || !dataRaw.main) {
    console.warn("Invalid data received from API");
    return null;
  }

  const data = weatherConditionFactory(
    dataRaw.main.temp,
    dataRaw.main.feels_like,
    dataRaw.main.humidity,
    dataRaw.wind.speed,
    dataRaw.main.pressure
  );
  return data;
}

async function putDataIntoContainer(city) {
  const data = await getAppropriateData(city);

  container.innerHTML = "";

  if (!data) {
    container.innerHTML =
      "<p>Error fetching weather data. Please try again.</p>";
    return;
  }
  const cityName = document.createElement("h2");
  cityName.textContent = city;
  container.appendChild(cityName);

  const tempElement = document.createElement("p");
  tempElement.textContent = `Temperature: ${data.temp}°C`;
  container.appendChild(tempElement);

  const feelsLikeElement = document.createElement("p");
  feelsLikeElement.textContent = `Feels Like: ${data.feels_like}°C`;
  container.appendChild(feelsLikeElement);

  const humidityElement = document.createElement("p");
  humidityElement.textContent = `Humidity: ${data.humidity}%`;
  container.appendChild(humidityElement);

  const windSpeedElement = document.createElement("p");
  windSpeedElement.textContent = `Wind Speed: ${data.wind_speed} m/s`;
  container.appendChild(windSpeedElement);

  const pressureElement = document.createElement("p");
  pressureElement.textContent = `Pressure: ${data.pressure} hPa`;
  container.appendChild(pressureElement);
}

function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  putDataIntoContainer(data.city);
}

function weatherApp() {
  const form = document.getElementById("weather-form");
  form.addEventListener("submit", (e) => handleForm(e));
}
weatherApp();
