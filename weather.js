document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const toggleBtn = document.getElementById("darkModeToggle");
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

const apiKey = "b211b498f18fb346dc1da6b62b1e6223"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name!");

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    alert("Error fetching weather data!");
    console.error(error);
  }
}

function displayCurrentWeather(data) {
  const weatherDiv = document.getElementById("currentWeather");
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡 Temp: ${data.main.temp}°C</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>☁️ Condition: ${data.weather[0].description}</p>
  `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h2>5-Day Forecast</h2>";

  for (let i = 0; i < data.list.length; i += 8) {
    const item = data.list[i];
    forecastDiv.innerHTML += `
      <div class="card">
        <h3>${new Date(item.dt_txt).toDateString()}</h3>
        <p>🌡 Temp: ${item.main.temp}°C</p>
        <p>☁️ ${item.weather[0].description}</p>
      </div>
    `;
  }
}
