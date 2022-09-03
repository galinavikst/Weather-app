function getCurrentTime() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentTime = new Date();
  let currentDay = weekDays[currentTime.getDay()];
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let now = document.querySelector("#now");
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  now.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;
}
getCurrentTime();

function getCityInputValue(event) {
  event.preventDefault();
  let input = document.querySelector("input");
  let city = input.value;
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}
function visitApp() {
  let city = "Farsta";
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}
visitApp();

function getCurrentTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let humid = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let descrip = response.data.weather[0].main;
  let icon = response.data.weather[0].icon;
  let feelsLike = Math.round(response.data.main.feels_like);
  let h1 = document.querySelector("h1");
  let country = document.querySelector("#country");
  let currentTemperature = document.querySelector("#current-temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconUrl = document.querySelector("img");
  iconUrl.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  currentTemperature.innerHTML = temp;
  h1.innerHTML = `${cityName}, `;
  country.innerHTML = countryName;
  humidity.innerHTML = humid;
  wind.innerHTML = windSpeed;
  description.innerHTML = `${descrip}, feels like ${feelsLike}°C`;
}
let form = document.querySelector("form");
form.addEventListener("submit", getCityInputValue);

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}

function navigatorOn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", navigatorOn);
let searchButton = document.querySelector("#button-search");
searchButton.addEventListener("click", getCityInputValue);
