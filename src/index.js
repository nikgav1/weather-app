const apiKey = '02f48485583adfe6c9f0547954991b91';

let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

async function getWeatherData (url){
    const response = await fetch(url, {mode: 'cors'})
    const data = await response.json()
    return data
}