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
  let monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentTime = new Date();
  let currentDay = weekDays[currentTime.getDay()];
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentMonth = currentTime.getMonth();
  let currentDayMonth = currentTime.getDate();
  let now = document.querySelector("#now");
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  now.innerHTML = `${currentDay}, ${monthName[currentMonth]} ${currentDayMonth}`;
}
getCurrentTime();

function getCurrentTemp(response) {
  console.log(response.data);
  temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  let humid = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let descrip = response.data.weather[0].main;
  let icon = response.data.weather[0].icon;
  let feelsLike = Math.round(response.data.main.feels_like);
  let coordLon = response.data.coord.lon;
  let coordLat = response.data.coord.lat;
  getForecastData(coordLat, coordLon);
  let h1 = document.querySelector("h1");
  let country = document.querySelector("#country");
  let currentTemperature = document.querySelector("#current-temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconUrl = document.querySelector("#main-icon");
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

function getForecastData(coordLat, coordLon) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordLat}&lon=${coordLon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(forecast);
}

function getCityInputValue(event) {
  event.preventDefault();
  let input = document.querySelector("input");
  let city = input.value;
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}

function visitApp(city) {
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemp);
}

function showCurrentLocation(position) {
  console.log(position);
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

function getWeekDays(unixTime) {
  let date = new Date(unixTime * 1000);
  let weekDay = date.getDay();
  let day = date.getDate();
  let month = date.getMonth();
  if (month < 10) {
    month = `0${month + 1}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[weekDay]} ${day}/${month}`;
}
function getTodayBoxData(max, min, icon) {
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let dayIcon = document.querySelector("#day-icon");
  maxTemp.innerHTML = `${max}°C`;
  minTemp.innerHTML = `${min}°C`;
  dayIcon.setAttribute("src", icon);
}

function forecast(response) {
  console.log(response.data.daily);
  let forecastArrayData = response.data.daily;
  let maxTemp = Math.round(forecastArrayData[0].temp.max);
  let minTemp = Math.round(forecastArrayData[0].temp.min);
  let icon = forecastArrayData[0].weather[0].icon;
  console.log(icon);
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  let forecastSpace = document.querySelector("#forecast");
  getTodayBoxData(maxTemp, minTemp, iconUrl);
  let forecastCodeHTML = `<div class="forecast-day">`;

  forecastArrayData.forEach(function displayAllForecast(forecastData, index) {
    if (index < 6 && index > 0) {
      forecastCodeHTML =
        forecastCodeHTML +
        `
     <div class="row-day shadow">
              <div class="forecast-header">
                <h4>${getWeekDays(forecastData.dt)}</h4>
                <img src="http://openweathermap.org/img/wn/${
                  forecastData.weather[0].icon
                }@2x.png" alt="forecast icon" id="day-icon" width="70" />
              </div>
              <div class="row g-0">
                <div class="col-6 max">
                  <img
                    src="media/circle-empty.png"
                    alt="day-night-icon"
                    width="15"
                  />
                  <p id="max-temp">${Math.round(forecastData.temp.max)}°C</p>
                </div>
                <div class="col-6 min">
                  <img
                    src="media/circle-full.png"
                    alt="day-night-icon"
                    width="15"
                  />
                  <p id="min-temp">${Math.round(forecastData.temp.min)}°C</p>
                </div>
              </div>
            </div>
  `;
    }
  });
  forecastCodeHTML = forecastCodeHTML + `</div>`;
  forecastSpace.innerHTML = forecastCodeHTML;
}

let temp = null;

let buttonCurrentLocation = document.querySelector("#button-current-location");
buttonCurrentLocation.addEventListener("click", navigatorOn);

let searchButton = document.querySelector("#button-search");
searchButton.addEventListener("click", getCityInputValue);

let form = document.querySelector("form");
form.addEventListener("submit", getCityInputValue);

visitApp("Farsta");
