/**
 * CALENDARIO UNIFICADO, CLIMA Y ESTADÍSTICAS
 * Versión Final: Animación de puntos y resaltado verde 5s.
 */

// ======================================
// 1. CONFIGURACIÓN Y SANTORAL
// ======================================


const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
let currentDate = new Date(); 
let nodes = {}; 

// ======================================
// 2. UTILIDADES
// ======================================
Date.prototype.getWeek = function () {
    const e = new Date(this.valueOf());
    const t = (this.getDay() + 6) % 7;
    e.setDate(e.getDate() - t + 3);
    const n = e.valueOf();
    e.setMonth(0, 1);
    if (e.getDay() !== 4) e.setMonth(0, 1 + ((4 - e.getDay() + 7) % 7));
    return 1 + Math.ceil((n - e) / 6048e5);
};

function moon_day(e) {
    const t = (v) => v - Math.floor(v);
    const dateCopy = new Date(e.getTime());
    dateCopy.setUTCHours(12, 0, 0, 0); 
    Date.prototype.getJulian = function () { return this / 864e5 - this.getTimezoneOffset() / 1440 + 2440587.5; };
    let n = dateCopy.getJulian(), r = dateCopy.getFullYear(), i = Math.PI / 180;
    let s = Math.floor((r - 1900) * 12.3685), o = (r - 1899.5) / 100, u = o * o, a = o * o * o;
    let f = 2415020 + 29 * s, l = 1178e-7 * u - 1.55e-7 * a + (0.75933 + 0.53058868 * s) - (837e-6 * o + 335e-6 * u);
    let c = 360 * t(s * 0.08084821133) + 359.2242, h = 360 * t(s * 0.07171366128) + 306.0253, p = 360 * t(s * 0.08519585128) + 21.2964;
    let v = 0, m = 0, d;
    while (m < n) {
        let g = l + 1.530588 * v, y = (c + v * 29.10535608) * i, b = (h + v * 385.81691806) * i, w = (p + v * 390.67050646) * i;
        g -= 0.4068 * Math.sin(b) + (0.1734 - 393e-6 * o) * Math.sin(y);
        g += 0.0161 * Math.sin(2 * b) + 0.0104 * Math.sin(2 * w);
        d = m; m = f + 28 * v + Math.floor(g + 0.5 / 1440); v++;
    }
    return (n - d) / 29.53059;
}

function changeTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem("userTheme", themeName);
}

function updateYearStats(year, month) {
  const hoy = new Date();
  const inicioAño = new Date(hoy.getFullYear(), 0, 1);
  const finAño = new Date(hoy.getFullYear(), 11, 31);
  const diasTransc = Math.floor((hoy - inicioAño) / 86400000) + 1;
  const diasFaltan = Math.floor((finAño - hoy) / 86400000);
  
  const transcEl = document.getElementById("transc-days");
  const remainEl = document.getElementById("remain-days");
  
  if (transcEl && remainEl) {
    if (year === hoy.getFullYear()) {
      transcEl.innerText = diasTransc;
      remainEl.innerText = diasFaltan;
    } else {
      transcEl.innerText = "---";
      remainEl.innerText = "---";
    }
  }
}

function openModal() {
    const modal = document.getElementById("calendar-modal");
    if (modal) modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("calendar-modal");
    if (modal) modal.style.display = "none";
}

function applyDateChange() {
    const newMonth = parseInt(document.getElementById("modal-month-select").value);
    const newYear = parseInt(document.getElementById("modal-year-input").value);
    if (!isNaN(newMonth) && !isNaN(newYear)) {
        currentDate.setMonth(newMonth);
        currentDate.setFullYear(newYear);
        renderCalendar(newMonth, newYear);
        closeModal();
    }
}

// ======================================
// 3. LÓGICA DEL CALENDARIO
// ======================================
function renderCalendar(month, year) {
  const tbody = document.getElementById("calendar-body");
  const today = new Date();
  if (!tbody) return;
  tbody.innerHTML = "";
  
  if (document.getElementById("month-display")) document.getElementById("month-display").innerText = monthNames[month];
  if (document.getElementById("year-display")) document.getElementById("year-display").innerText = year;
  
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let dateCounter = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    let rowHasContent = false;
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('td');
      if ((i === 0 && j >= startingDay) || (i > 0 && dateCounter <= daysInMonth)) {
        if (j === 0) cell.classList.add('is-sunday');
        if (dateCounter === today.getDate() && month === today.getMonth() && year === today.getFullYear()) cell.classList.add("is-today");
       cell.innerHTML = `<span class="day-number">${dateCounter}</span>`;
        dateCounter++;
        rowHasContent = true;
      }
      row.appendChild(cell);
    }
    if (rowHasContent) tbody.appendChild(row);
  }
  updateYearStats(year, month);
}

// ======================================
// 4. CLIMA Y BÚSQUEDA
// ======================================
const rainIcon = "";

function getWeatherDescription(code, is_day) {
    const weatherCodes = {
        // DESPEJADO Y NUBES
        0:  { desc: "Cielo despejado", icon: is_day ? "☀️" : "🌙" },
        1:  { desc: "Principalmente despejado", icon: is_day ? "🌤️" : "🌙" },
        2:  { desc: "Parcialmente nublado", icon: is_day ? "⛅" : "☁️" },
        3:  { desc: "Nublado", icon: "☁️" },

        // NIEBLA
        45: { desc: "Niebla", icon: "🌫️" },
        48: { desc: "Niebla con escarcha", icon: "🌫️❄️" },

        // LLOVIZNA (DRIZZLE)
        51: { desc: "Llovizna ligera", icon: "🌦️" },
        53: { desc: "Llovizna moderada", icon: "🌦️" },
        55: { desc: "Llovizna densa", icon: "🌧️" },
        56: { desc: "Llovizna gélida ligera", icon: "❄️" },
        57: { desc: "Llovizna gélida densa", icon: "❄️" },

        // LLUVIA (RAIN)
        61: { desc: "Lluvia ligera", icon: "💧" },
        63: { desc: "Lluvia moderada", icon: "🌧️" },
        65: { desc: "Lluvia fuerte", icon: "🌧️" },
        66: { desc: "Lluvia gélida ligera", icon: "🧊" },
        67: { desc: "Lluvia gélida fuerte", icon: "🧊🌧️" },

        // NIEVE (SNOW)
        71: { desc: "Nevada ligera", icon: "❄️" },
        73: { desc: "Nevada moderada", icon: "❄️" },
        75: { desc: "Nevada fuerte", icon: "🌨️" },
        77: { desc: "Granos de nieve", icon: "🌨️" },

        // CHUBASCOS (SHOWERS)
        80: { desc: "Chubascos de lluvia ligeros", icon: "🌦️" },
        81: { desc: "Chubascos de lluvia moderados", icon: "🌦️" },
        82: { desc: "Chubascos de lluvia violentos", icon: "⛈️" },
        85: { desc: "Chubascos de nieve ligeros", icon: "🌨️" },
        86: { desc: "Chubascos de nieve fuertes", icon: "🌨️" },

        // TORMENTAS (THUNDERSTORM)
        95: { desc: "Tormenta eléctrica", icon: "⛈️" },
        96: { desc: "Tormenta con granizo ligero", icon: "⛈️🌨️" },
        99: { desc: "Tormenta con granizo fuerte", icon: "⛈️⚡" }
    };

    return weatherCodes[code] || { desc: "Condiciones desconocidas", icon: "❓" };
}
async function getAirQuality(lat, lon) {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5,pm10&timezone=auto`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            aqi: data.current.european_aqi,
            pm25: data.current.pm2_5,
            desc: getAQIDescription(data.current.european_aqi)
        };
    } catch (e) {
        console.error("Error calidad aire:", e);
        return null;
    }
}

function getAQIDescription(aqi) {
    if (aqi < 0)    return "Desconocida";
    if (aqi <= 20)  return "Excelente";
    if (aqi <= 40)  return "Buena";
    if (aqi <= 60)  return "Moderada";
    if (aqi <= 80)  return "Mala";
    if (aqi <= 100) return "Muy Mala";
    return "Extremadamente Mala";
}



function renderWeeklyForecast(data) {
    const container = document.getElementById("weekly-forecast-container");
    if (!container) return;
    container.innerHTML = "";
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    data.daily.time.forEach((dateStr, i) => {
        const date = new Date(dateStr + "T00:00:00");
        const dayName = i === 0 ? "Hoy" : days[date.getDay()];
        const weather = getWeatherDescription(data.daily.weather_code[i], true);
        const dailyRain = data.daily.precipitation_probability_max[i];
        
        container.innerHTML += `
            <div class="forecast-day-item">
                <span class="day-label">${dayName}</span>
                <div class="day-icon">${weather.icon}</div>
                <div class="day-rain">🌧️${rainIcon} ${dailyRain}%</div>
                <div class="day-temps">
                    <span class="max">${Math.round(data.daily.temperature_2m_max[i])}°</span>
                    <span class="min">${Math.round(data.daily.temperature_2m_min[i])}°</span>
                </div>
            </div>`;
    });
}

function renderHourlyForecast(data, type = "temp") {

    const container = document.getElementById("hourly-container");
    if (!container) return;

    container.innerHTML = "";

    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;
    const rain = data.hourly.precipitation_probability;
    const wind = data.hourly.wind_speed_10m;

    for (let i = 0; i < 24; i++) {

        const hour = new Date(times[i]).getHours();

        let value = "";

        if (type === "temp") value = `${Math.round(temps[i])}°`;
        if (type === "rain") value = `${rain[i]}%`;
        if (type === "wind") value = `${Math.round(wind[i])} km/h`;

        container.innerHTML += `
            <div class="hourly-item">
                <div class="hour">${hour}:00</div>
                <div class="value">${value}</div>
            </div>
        `;
    }
}

async function setupSearch() {
    const input = document.getElementById('city-input');
    const results = document.getElementById('search-results');
    let currentFocus = -1; 

    if (!input || !results) return;

    const addActive = (items) => {
        if (!items) return false;
        Array.from(items).forEach(el => el.classList.remove("result-item-active"));
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("result-item-active");
        items[currentFocus].scrollIntoView({ block: "nearest" });
    };

    input.addEventListener('input', async (e) => {
        const query = e.target.value;
        currentFocus = -1;
        if (query.length < 3) { results.style.display = 'none'; return; }

        try {
            const resp = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=es&format=json`);
            const data = await resp.json();
            if (data.results) {
                results.innerHTML = '';
                results.style.display = 'block';
                data.results.forEach((city, index) => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    const cityName = city.name;
                    const adminName = city.admin1 || '';
                    const countryName = city.country || '';
                    
                    item.innerHTML = `<div class="result-icon">📍</div><div class="location-info"><span class="city-name">${cityName}</span><span class="region-state">${adminName}</span></div><div class="country-info">${countryName}</div>`;

                    const selectThisCity = () => {
                        input.value = cityName;
                        results.style.display = 'none';
                        const fullLoc = { lat: city.latitude, lon: city.longitude, name: cityName, admin: adminName, country: countryName };
                        localStorage.setItem("last_custom_city", JSON.stringify(fullLoc));
                        localStorage.setItem("userCity", "custom");
                        updateCitySelector(fullLoc);
                        fetchWeatherByCoords(city.latitude, city.longitude, fullLoc);
                    };

                    item.onclick = selectThisCity;
                    results.appendChild(item);
                });
            }
        } catch (err) { console.error("Error búsqueda:", err); }
    });

    input.addEventListener('keydown', (e) => {
        const items = results.getElementsByClassName("result-item");
        if (results.style.display === 'none' || items.length === 0) return;

        if (e.key === "ArrowDown") {
            currentFocus++;
            addActive(items);
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            currentFocus--;
            addActive(items);
            e.preventDefault();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            }
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target !== input) results.style.display = 'none';
    });
}

function updateCitySelector(locationObj) {
    const citySelect = document.getElementById("city-select");
    if (!citySelect) return;
    let customOption = citySelect.querySelector('option[value="custom"]');
    if (!customOption) {
        customOption = document.createElement("option");
        customOption.value = "custom";
        citySelect.appendChild(customOption);
    }
    customOption.textContent = `📍 ${locationObj.name}`;
    citySelect.value = "custom";
}

async function fetchWeatherByCoords(lat, lon, locationObj) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,visibility,dew_point_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,weather_code,precipitation_probability_max&timezone=auto&forecast_days=7`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.cachedAt = new Date().getTime();
        localStorage.setItem("weather_cache_data", JSON.stringify(data));
        localStorage.setItem("weather_cache_location", JSON.stringify(locationObj));
        displayWeatherData(data, -1, locationObj); 
    } catch (e) { console.error("Error clima buscador:", e); }
}

// Dentro de displayWeatherData o como función complementaria:
async function updateAQIUI(lat, lon) {
    const airData = await getAirQuality(lat, lon);
    if (airData) {
        const aqiEl = document.getElementById("aqi-status");
        const aqiDescEl = document.getElementById("aqi-advice");
        
        if (aqiEl) aqiEl.textContent = airData.aqi;

        if (aqiDescEl) {
            aqiDescEl.textContent = airData.desc;
            aqiDescEl.style.color = airData.aqi > 60 ? "#e74c3c" : "#2ecc71";
        }

        localStorage.setItem("last_aqi_value", airData.aqi);
        localStorage.setItem("last_aqi_desc", airData.desc);
    }
}

function displayWeatherData(data, cityId, locationObj = null) {
    if (data.timezone) localStorage.setItem("current_timezone", data.timezone);

    const weather = getWeatherDescription(data.current.weather_code, data.current.is_day);
    const cities = [{ name: "Gral. Escobedo, N.L" }, { name: "Monterrey, N.L" }, { name: "San Nicolás, N.L" }, { name: "Tampico, Tamps" }, { name: "Naranjos, Ver" }];
    
    const locationEl = document.querySelector(".location") || document.getElementById("location-name");
    if (locationEl) {
        if (locationObj) {
            const regionPart = locationObj.admin ? `${locationObj.admin}, ` : "";
            locationEl.textContent = `${locationObj.name}, ${regionPart}${locationObj.country}`;
        } else {
            locationEl.textContent = `${cities[cityId]?.name || "Ubicación"}, México`;
        }
    }

    const updateTimeEl = document.getElementById("weather-update-time");
    if (updateTimeEl) {
        const timeRef = data.cachedAt ? new Date(data.cachedAt) : new Date();
        const ahora = new Date().getTime();
        const timezone = data.timezone || localStorage.getItem("current_timezone") || "auto";
        const formattedUpdateTime = timeRef.toLocaleTimeString("es-MX", { 
            hour: "2-digit", 
            minute: "2-digit", 
            hour12: false,
            timeZone: timezone 
        });

        // LÓGICA DE MENSAJES CON ANIMACIÓN DE PUNTOS
        if (ahora - data.cachedAt < 30000) {
            updateTimeEl.style.color = "#2ecc71"; 
            updateTimeEl.style.fontWeight = "bold"; 
            
            let dots = 0;
            const baseText = "Actualizando información";
            updateTimeEl.textContent = baseText;

            const dotsInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                updateTimeEl.textContent = baseText + ".".repeat(dots);
            }, 1000);

            setTimeout(() => {
                clearInterval(dotsInterval);
                updateTimeEl.style.color = ""; 
                updateTimeEl.style.fontWeight = "";
                updateTimeEl.textContent = `Última actualización: ${formattedUpdateTime}`;
            }, 5000);
        } else {
            updateTimeEl.style.color = "#2ecc71"; 
            updateTimeEl.style.fontWeight = "bold"; 
            updateTimeEl.textContent = `Última actualización: ${formattedUpdateTime}`;
            setTimeout(() => {
                updateTimeEl.style.color = ""; 
                updateTimeEl.style.fontWeight = "";
            }, 1500);
        }
    }

    if (document.getElementById("weather-description")) document.getElementById("weather-description").textContent = weather.desc;
    if (document.getElementById("current-temp")) document.getElementById("current-temp").textContent = `${Math.round(data.current.temperature_2m)}°`;
    if (document.querySelector(".weather-icon")) document.querySelector(".weather-icon").textContent = weather.icon;
    
    if (document.getElementById("rain-probability")) {
        document.getElementById("rain-probability").innerHTML = `${rainIcon} ${data.current.precipitation_probability}%`;
    }

    if (document.getElementById("temp-day")) document.getElementById("temp-day").textContent = `${Math.round(data.daily.temperature_2m_max[0])}°`;
    if (document.getElementById("temp-night")) document.getElementById("temp-night").textContent = `${Math.round(data.daily.temperature_2m_min[0])}°`;
    if (document.getElementById("max-min-detail")) document.getElementById("max-min-detail").textContent = `${Math.round(data.daily.temperature_2m_max[0])}°/${Math.round(data.daily.temperature_2m_min[0])}°`;
    if (document.getElementById("sensation-temp")) document.getElementById("sensation-temp").textContent = `${Math.round(data.current.apparent_temperature)}°`;
    if (document.getElementById("humidity")) document.getElementById("humidity").textContent = `${data.current.relative_humidity_2m}%`;
    if (document.getElementById("pressure")) document.getElementById("pressure").textContent = `${Math.round(data.current.surface_pressure)} hPa`;
    if (document.getElementById("wind-speed")) document.getElementById("wind-speed").textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
    if (document.getElementById("uv-index")) document.getElementById("uv-index").textContent = Math.round(data.daily.uv_index_max[0]);
    if (document.getElementById("visibility")) document.getElementById("visibility").textContent = `${(data.current.visibility / 1000).toFixed(1)} km`;
    if (document.getElementById("dew-point")) document.getElementById("dew-point").textContent = `${Math.round(data.current.dew_point_2m)}°`;
    if (document.getElementById("sunrise")) document.getElementById("sunrise").textContent = data.daily.sunrise[0].split("T")[1];
    if (document.getElementById("sunset")) document.getElementById("sunset").textContent = data.daily.sunset[0].split("T")[1];
    
    if (document.getElementById("rain-max-detail")) {
        document.getElementById("rain-max-detail").textContent = `${data.daily.precipitation_probability_max[0]}%`;
    }

    renderWeeklyForecast(data);

    renderHourlyForecast(data, "temp");

    // 1. Tomar la hora del dashboard
const tz = data.timezone || "auto";

const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: tz })
);

const dashboardHour = now.getHours();

    // 2. Llamar a la función con todos los parámetros
    updateWeatherBackground(
    weather.desc,
    dashboardHour,
    data.daily.sunrise[0].split("T")[1],
    data.daily.sunset[0].split("T")[1]
);
}

async function getWeatherData(forceUpdate = false) {

    const cities = [
        { lat: 25.8087, lon: -100.3175 },
        { lat: 25.6866, lon: -100.3161 },
        { lat: 25.7502, lon: -100.2844 },
        { lat: 22.2852, lon: -97.8778 },
        { lat: 21.3509, lon: -97.6866 }
    ];

    const cityId = localStorage.getItem("userCity") || "0";
    const ahora = Date.now();
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutos

    let lat, lon, locationObj = null;

    if (cityId === "custom") {
        const custom = JSON.parse(localStorage.getItem("last_custom_city"));
        if (custom) {
            lat = custom.lat;
            lon = custom.lon;
            locationObj = custom;
        }
    } else {
        const city = cities[parseInt(cityId)];
        lat = city.lat;
        lon = city.lon;
    }

    // 🔎 -------- CONTROL DE CACHÉ --------
    const cachedData = JSON.parse(localStorage.getItem("weather_cache_data"));
    const cachedCity = localStorage.getItem("weather_cache_city");

    if (
        !forceUpdate &&
        cachedData &&
        cachedCity === cityId &&
        (ahora - cachedData.cachedAt < CACHE_DURATION)
    ) {
        // Mostrar también AQI desde caché si existe
        if (cachedData.aqiData) {
            const { aqi, status, advice, iconClass } = cachedData.aqiData;
            const statusEl = document.getElementById("aqi-status");
            const adviceEl = document.getElementById("aqi-advice");
            const iconEl = document.getElementById("aqi-icon-dynamic");

            if (statusEl) statusEl.textContent = status;
            if (adviceEl) adviceEl.textContent = advice;
            if (iconEl) iconEl.className = `fas ${iconClass} aqi-icon`;
        }

        displayWeatherData(cachedData, cityId, locationObj);
        return;
    }

    // ------------- URLs API -------------
    
    //const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,visibility,dew_point_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,weather_code,precipitation_probability_max&timezone=auto&forecast_days=7`;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,visibility,dew_point_2m,precipitation_probability
&hourly=temperature_2m,precipitation_probability,wind_speed_10m,weather_code
&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,weather_code,precipitation_probability_max
&timezone=auto
&forecast_days=7`;

    const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi&timezone=auto`;

    try {

        const [weatherRes, airRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(airQualityUrl)
        ]);

        const weatherData = await weatherRes.json();
        const airData = await airRes.json();

        // -------- LÓGICA AQI --------
        const aqi = airData.current.european_aqi;
        let status = "";
        let advice = "";
        let iconClass = "";

        if (aqi <= 20) {
            status = "Excelente";
            advice = "Calidad de aire ideal para actividades al aire libre.";
            iconClass = "fa-check-circle";
        } else if (aqi <= 40) {
            status = "Buena";
            advice = "Calidad aceptable; sin riesgos para la población.";
            iconClass = "fa-leaf";
        } else if (aqi <= 60) {
            status = "Moderada";
            advice = "Riesgo moderado para personas muy sensibles.";
            iconClass = "fa-smog";
        } else if (aqi <= 80) {
            status = "Mala";
            advice = "El público general puede experimentar irritación.";
            iconClass = "fa-mask";
        } else {
            status = "Muy Mala";
            advice = "Aviso de salud por condiciones de emergencia.";
            iconClass = "fa-exclamation-triangle";
        }

        const statusEl = document.getElementById("aqi-status");
        const adviceEl = document.getElementById("aqi-advice");
        const iconEl = document.getElementById("aqi-icon-dynamic");

        if (statusEl) statusEl.textContent = status;
        if (adviceEl) adviceEl.textContent = advice;
        if (iconEl) iconEl.className = `fas ${iconClass} aqi-icon`;

        // -------- GUARDAR CACHÉ --------
        weatherData.cachedAt = ahora;
        weatherData.aqiData = { aqi, status, advice, iconClass }; // <-- AQI también en caché

        localStorage.setItem("weather_cache_data", JSON.stringify(weatherData));
        localStorage.setItem("weather_cache_city", cityId);
        localStorage.setItem("last_aqi_value", aqi);
        localStorage.setItem("last_aqi_desc", status);
        localStorage.setItem("last_aqi_advice", advice);

        displayWeatherData(weatherData, cityId, locationObj);

    } catch (e) {
        console.error("Error al obtener datos meteorológicos:", e);

        if (cachedData) {
            displayWeatherData(cachedData, cityId, locationObj);
        }
    }
}

// ======================================
// 5. RELOJ DINÁMICO POR ZONA HORARIA
// ======================================
function updateTimeAndDate() {
    let now = new Date();
    const savedTimezone = localStorage.getItem("current_timezone");

    if (savedTimezone) {
        try {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: savedTimezone,
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false
            });
            const parts = formatter.formatToParts(now);
            const p = {};
            parts.forEach(part => p[part.type] = part.value);
            now = new Date(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
        } catch (e) { console.error("Error ajuste zona:", e); }
    }

    const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    if (nodes.mainTime) {
        nodes.mainTime.textContent = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        nodes.seconds.textContent = now.getSeconds().toString().padStart(2, "0");
    }
    if (nodes.dayName) {
        nodes.dayName.textContent = dayNames[now.getDay()];
        nodes.dateNumber.textContent = now.getDate().toString().padStart(2, "0");
        nodes.monthYear.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    }
    
    if (nodes.weekNumber) nodes.weekNumber.textContent = now.getWeek();
    
    if (!window.lastMoonCalc || now.getDate() !== window.lastMoonCalc) {
    const age = moon_day(now);
    const moonIdxCalc = Math.floor((age + 0.0625) * 8) % 8;
    window.cachedMoon = moonIdxCalc;
    window.lastMoonCalc = now.toDateString();
}

const moonIdx = window.cachedMoon;
    const moonEmojis = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
    const moonTexts = ["Luna Nueva", "Luna Creciente", "Cuarto Creciente", "Gibosa Creciente", "Luna Llena", "Gibosa Menguante", "Cuarto Menguante", "Luna Menguante"];
    if (nodes.moonIcon) nodes.moonIcon.textContent = moonEmojis[moonIdx];
    const moonPhaseTextEl = document.getElementById("moon-phase-text");
    if (moonPhaseTextEl) moonPhaseTextEl.textContent = moonTexts[moonIdx];
}

function startWeatherAutoUpdate() {
    setInterval(() => {
        const ahora = new Date();
        const minutos = ahora.getMinutes();
        const segundos = ahora.getSeconds();
        if (minutos % 15 === 0 && segundos === 0) {
            localStorage.removeItem("weather_cache_data");
            getWeatherData();
        }
    }, 1000);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
}

// ======================================
// 6. INICIALIZACIÓN
// ======================================
function initApp() {
    nodes = {
        mainTime: document.getElementById("main-time"),
        seconds: document.getElementById("current-seconds"),
        dayName: document.getElementById("day-name"),
        dateNumber: document.getElementById("date-number"),
        monthYear: document.getElementById("month-year"),
        weekNumber: document.getElementById("week-number"),
        moonIcon: document.getElementById("moon-icon")
    };

    setupSearch();

    const modalMonthSelect = document.getElementById("modal-month-select");
    if (modalMonthSelect) {
        modalMonthSelect.innerHTML = "";
        monthNames.forEach((m, i) => {
            let opt = document.createElement("option");
            opt.value = i; opt.innerText = m;
            modalMonthSelect.appendChild(opt);
        });
        modalMonthSelect.value = currentDate.getMonth();
    }
    if (document.getElementById("modal-year-input")) document.getElementById("modal-year-input").value = currentDate.getFullYear();
    
    document.getElementById("month-display")?.addEventListener("click", openModal);
    document.getElementById("year-display")?.addEventListener("click", openModal);
    document.getElementById("close-modal")?.addEventListener("click", closeModal);
    document.getElementById("apply-date")?.addEventListener("click", applyDateChange);

    const savedTheme = localStorage.getItem("userTheme") || "red-date";
    changeTheme(savedTheme);
    
    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener("change", (e) => changeTheme(e.target.value));
    }

    const citySelect = document.getElementById("city-select");
    if (citySelect) {
        const customData = JSON.parse(localStorage.getItem("last_custom_city"));
        const savedCityId = localStorage.getItem("userCity") || "0";
        if (savedCityId === "custom" && customData) updateCitySelector(customData);
        else citySelect.value = savedCityId;
        citySelect.addEventListener("change", (e) => { 
            localStorage.removeItem("weather_cache_data");
            localStorage.setItem("userCity", e.target.value); 
            getWeatherData(); 
        });
    }
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
    updateTimeAndDate();
    getWeatherData();
    
    setInterval(updateTimeAndDate, 1000);
    startWeatherAutoUpdate();

    initRainEffect();
}

/* ===================================================== */
/* 7. ANTI BURN-IN CORPORATIVO OLED 24/7 – TABLET           */
/* ===================================================== */

function initCorporateProtection() {
    const container = document.querySelector(".calendar-container");
    if (!container) return;

    let shiftIndex = 0;
    let opacityLevel = 0.92;
    let redToggle = false;
    let minimalMode = false;
    let nightMode = false;
    let lastInteraction = Date.now();

    const shifts = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 }
    ];

    /* 1️⃣ PIXEL SHIFT LENTO */
    function applyShift() {
        shiftIndex = (shiftIndex + 1) % shifts.length;
        const pos = shifts[shiftIndex];
        container.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }

    /* 2️⃣ VARIACIÓN OPACIDAD */
    function varyOpacity() {
        opacityLevel = opacityLevel === 0.92 ? 0.88 : 0.92;
        container.style.opacity = opacityLevel;
    }

    /* 3️⃣ VARIACIÓN ROJO */
    function varyRedTone() {
        redToggle = !redToggle;
        document.documentElement.style.setProperty(
            "--primary-red",
            redToggle ? "#c92a2a" : "#b82222"
        );
    }

    /* 4️⃣ MODO INACTIVIDAD */
    function checkInactivity() {
        const now = Date.now();
        const minutesInactive = (now - lastInteraction) / 60000;

        if (minutesInactive > 30 && !minimalMode) {
            activateMinimalMode();
        }

        if (minutesInactive <= 30 && minimalMode) {
            deactivateMinimalMode();
        }
    }

    function activateMinimalMode() {
        minimalMode = true;
        container.style.opacity = 0.75;
        document.querySelectorAll(".santoral-text").forEach(el => {
            el.style.display = "none";
        });
    }

    function deactivateMinimalMode() {
        minimalMode = false;
        container.style.opacity = 0.92;
        document.querySelectorAll(".santoral-text").forEach(el => {
            el.style.display = "";
        });
    }

    /* 5️⃣ MODO NOCTURNO */
   function checkNightMode() {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 6 && !nightMode) {
        nightMode = true;
        container.style.opacity = 0.65;
        container.style.filter = "brightness(0.85)";
    }

    if (hour >= 6 && nightMode) {
        nightMode = false;
        container.style.opacity = 0.92;
        container.style.filter = "brightness(1)";
    }
}

    /* 6️⃣ REFRESCO VISUAL */
    
    function visualRefresh() {
        container.style.transition = "opacity 1s ease";
        container.style.opacity = 0.3;
        setTimeout(() => {
            container.style.opacity = nightMode ? 0.65 : 0.92;
        }, 1000);
    }

    /* INTERACCIÓN USUARIO */
    function registerInteraction() {
        lastInteraction = Date.now();
    }

    window.addEventListener("touchstart", registerInteraction);
    window.addEventListener("click", registerInteraction);

    /* INTERVALOS */
    setInterval(applyShift, 240000);       // 4 min
    setInterval(varyOpacity, 600000);      // 10 min
    setInterval(varyRedTone, 900000);      // 15 min
    setInterval(checkInactivity, 60000);   // 1 min
    setInterval(checkNightMode, 300000);   // 5 min
    setInterval(visualRefresh, 21600000);  // 6 horas
}

/* AJUSTE PARA ACTIVACIÓN DINÁMICA POR CAMBIO DE TEMA O CARGA */
document.addEventListener("DOMContentLoaded", function () {
    let protectionStarted = false;

    function checkAndStart() {
        if (document.body.classList.contains("theme-amoled-pro") && !protectionStarted) {
            initCorporateProtection();
            protectionStarted = true; // Evita duplicar intervalos
        }
    }

    // Revisar al cargar
    checkAndStart();

    // Revisar cada vez que cambie la clase del body (cuando seleccionas el tema)
    const observer = new MutationObserver(checkAndStart);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

// ======================================
// 8. ANUNCIO DE VOZ (RENATA) - FINAL
// ======================================

let voiceEnabled = false;
let lastAnnouncementSecond = null;

/**
 * Función principal de anuncio.
 * @param {boolean} forceUpdate - Si es true, refresca la API. Si es false, usa datos en pantalla.
 */

let speakingNow = false; // Bloqueo global (Mutex) para evitar superposiciones

/**
 * Función principal de anuncio.
 * @param {boolean} forceUpdate - Si es true, refresca la API. Si es false, usa datos en pantalla.
 */
async function announceWeather(forceUpdate = true) {
    // 1️⃣ PREVENCIÓN DE ANUNCIOS SIMULTÁNEOS
    const now = new Date();
const currentSecondKey = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

// 1️⃣ Bloqueo por ejecución activa
if (speakingNow) return;

// 2️⃣ Bloqueo por segundo exacto (anti-duplicado por lag)
if (lastAnnouncementSecond === currentSecondKey) return;

speakingNow = true;
lastAnnouncementSecond = currentSecondKey;

    const toggle = document.getElementById("voice-toggle");
    if (!toggle || !toggle.checked) {
        speakingNow = false;
        return;
    }

    // 2. CONTROL DE CONSULTAS API
  if (forceUpdate && typeof getWeatherData === "function") {
    try {
        await getWeatherData(true);
    } catch (e) {
        console.error("Error actualizando clima antes del audio:", e);
    }
}

    // 3. OBTENCIÓN Y CORRECCIÓN DE CIUDAD (PARA TABLET)
    const cityId = localStorage.getItem("userCity") || "0";
    const cities = [
        { name: "Gral. Escobedo" }, 
        { name: "Monterrey" }, 
        { name: "San Nicolás" }, 
        { name: "Tampico" }, 
        { name: "Naranjos" }
    ];
    const customData = JSON.parse(localStorage.getItem("last_custom_city"));
    
    let nombreCiudad = (cityId === "custom" && customData) ? customData.name : (cities[cityId]?.name || "la ciudad");
    
    // Parche para que la tablet diga "General" y "Nuevo León" correctamente
    const nombreParaVoz = nombreCiudad.replace("Gral.", "General").replace("N.L.", "Nuevo León");

    let ahora = new Date();
const savedTimezone = localStorage.getItem("current_timezone");

if (savedTimezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: savedTimezone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        const parts = formatter.formatToParts(ahora);
        const p = {};
        parts.forEach(part => p[part.type] = part.value);

        ahora = new Date(
            p.year,
            p.month - 1,
            p.day,
            p.hour,
            p.minute,
            p.second
        );
    } catch (e) {
        console.error("Error ajustando zona horaria en anuncio:", e);
    }
}

const horas = ahora.getHours();
const minutos = ahora.getMinutes();
    const temp = document.getElementById("current-temp")?.textContent.replace("°", "") || "--";
    const sensacion = document.getElementById("sensation-temp")?.textContent.replace("°", "") || "--";
    const aire = document.getElementById("aqi-status")?.textContent || "";

    // 4. LÓGICA DE SALUDOS DINÁMICOS
    let saludoInicio = "";
    let saludoFinal = "";

    if (horas === 7) {
        saludoInicio = "Buenos días. ";
    }
    if (horas === 21) {
        saludoFinal = ". Buenas noches";
    }

    //const mensaje = `${saludoInicio}Son las ${horas} horas con ${minutos} minutos. La temperatura actual en ${nombreParaVoz} es de ${temp} grados con sensación de ${sensacion}${saludoFinal}`;
    const mensaje = `${saludoInicio}Son las ${horas} horas, con ${minutos} minutos. Actualmente en ${nombreParaVoz} la calidad del aire es ${aire}. La temperatura es de ${temp} grados, con sensación térmica de ${sensacion}.${saludoFinal}`;
    // 5. CONFIGURACIÓN DE VOZ
    const utterance = new SpeechSynthesisUtterance(mensaje);
    const voices = window.speechSynthesis.getVoices();
    const renata = voices.find(v => v.name.includes("Renata")) 
                 || voices.find(v => v.name.includes("Sabina")) 
                 || voices.find(v => v.lang === "es-MX" && v.name.includes("female"))
                 || voices.find(v => v.lang === "es-MX");

    if (renata) {
        utterance.voice = renata;
    }

   utterance.volume = 1;
utterance.rate = 1;
utterance.pitch = 1.05;

    // 6. LÓGICA DEL TIMBRE Y LIBERACIÓN DE BLOQUEO
    const bell = new Audio('audio/ding-dong.mp3');

    // Al terminar de hablar, suena el timbre y liberamos el bloqueo
    utterance.onend = () => {
        bell.play();
        speakingNow = false;
        console.log("Voz finalizada. Bloqueo liberado.");
    };

    // Si hay un error, también liberamos el bloqueo para no dejar mudo el sistema
    utterance.onerror = () => {
        speakingNow = false;
    };

    // 7. EJECUCIÓN CON TIMBRE INICIAL
    bell.play().then(() => {
        setTimeout(() => {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }, 500);
    }).catch(e => {
        // Fallback si el navegador bloquea el audio inicial
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });
}
/**
 * Inicializador del control de voz con monitoreo de tiempo real.
 */
function initVoiceControl() {
    const voiceToggle = document.getElementById("voice-toggle");

    if (voiceToggle) {
        // Cargar estado persistente de localStorage
        const savedStatus = localStorage.getItem("voice_announcement_enabled") === "true";
        voiceToggle.checked = savedStatus;

        voiceToggle.addEventListener("change", (e) => {
            const isChecked = e.target.checked;
            localStorage.setItem("voice_announcement_enabled", isChecked);

            if (isChecked) {
                window.speechSynthesis.getVoices();
                // Al activar MANUALMENTE: NO actualiza la API (ahorro de datos)
                setTimeout(() => announceWeather(false), 100); 
            } else {
                window.speechSynthesis.cancel(); 
            }
        });
    }

    // RELOJ DE MONITOREO (REVISA CADA SEGUNDO)
    setInterval(() => {
       let ahora = new Date();
const savedTimezone = localStorage.getItem("current_timezone");

if (savedTimezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: savedTimezone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        const parts = formatter.formatToParts(ahora);
        const p = {};
        parts.forEach(part => p[part.type] = part.value);

        ahora = new Date(
            p.year,
            p.month - 1,
            p.day,
            p.hour,
            p.minute,
            p.second
        );
    } catch (e) {
        console.error("Error ajustando zona horaria en control de voz:", e);
    }
}

const h = ahora.getHours();
const m = ahora.getMinutes();
const s = ahora.getSeconds();

        // A. AUTO-ACTIVACIÓN Y ANUNCIO DE LAS 07:00:00 (Fuerza API)
        if (h === 21 && m === 0 && s === 0) {
            if (voiceToggle && !voiceToggle.checked) {
                voiceToggle.checked = true;
                localStorage.setItem("voice_announcement_enabled", "true");
            }
            announceWeather(true);
        } 
        // B. ANUNCIO DE CADA HORA EN PUNTO (Fuerza API)
        else if (m === 0 && s === 0 ) {
    announceWeather(false);
}
        // C. AUTO-DESACTIVACIÓN A LAS 21:01:00
        else if (h === 21 && m === 1 && s === 0) {
            if (voiceToggle && voiceToggle.checked) {
                voiceToggle.checked = false;
                localStorage.setItem("voice_announcement_enabled", "false");
                window.speechSynthesis.cancel();
            }
        }
    }, 1000);
}

// Registro de eventos para cargar las voces y el controlador
document.addEventListener("DOMContentLoaded", () => {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
    initVoiceControl();
});


// ==========================================
// Fondo dinámico inteligente según clima + hora
// ==========================================

function updateWeatherBackground(weatherDesc, dashboardHour, sunriseTime, sunsetTime) {

    const hour = dashboardHour;

    // Seguridad: si no vienen datos de amanecer/atardecer
    let sunriseHour = 6;
    let sunsetHour = 18;

    if (sunriseTime && sunriseTime.includes(":")) {
        sunriseHour = parseInt(sunriseTime.split(":")[0]);
    }

    if (sunsetTime && sunsetTime.includes(":")) {
        sunsetHour = parseInt(sunsetTime.split(":")[0]);
    }

    let bg = "clear.jpg";

    const desc = weatherDesc.toLowerCase();

    // ACTIVAR ANIMACIÓN DE LLUVIA
    const isRain = desc.includes("lluvia") || desc.includes("llovizna");

    if (isRain) {
        document.body.classList.add("rain-active");
    } else {
        document.body.classList.remove("rain-active");
    }

    // detectar si es de noche
    const isNight = hour >= sunsetHour + 1 || hour < sunriseHour;

    // --- PRIORIDAD: clima ---
    if (desc.includes("tormenta")) {
        bg = "storm.jpg";
    } 
    else if (desc.includes("lluvia") || desc.includes("llovizna")) {

        if (isNight) {
            bg = "rainy-night.jpg";
        } else {
            bg = "rain.jpg";
        }

    } 
    else if (desc.includes("nieve")) {
        bg = "snow.jpg";
    } 
    else if (desc.includes("niebla")) {
        bg = "fog.jpg";
    } 
    else if (desc.includes("nublado") || desc.includes("nubes")) {

        if (isNight) {
            bg = "cloudy-night.jpg";
        } else {
            bg = "clouds.jpg";
        }

    } 
    else {

        // --- SEGÚN HORA ---
        if (hour >= sunriseHour && hour < sunriseHour + 1) {
            bg = "sunrise.jpg";
        } 
        else if (hour >= sunsetHour && hour < sunsetHour + 1) {
            bg = "sunset.jpg";
        } 
        else if (isNight) {
            bg = "night.jpg";
        } 
        else {
            bg = "clear.jpg";
        }

    }

    // Solo aplicar fondo si el tema es red-date
    if(document.body.classList.contains("theme-red-date")){

        document.body.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.40), rgba(0,0,0,0.40)), url('./img/${bg}')`;

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

    }else{

        // quitar fondo para otros temas
        document.body.style.backgroundImage = "none";

    }

}

function animateTime(){
const time = document.getElementById("main-time");

time.style.transform = "scale(1.05)";
setTimeout(()=>{
time.style.transform = "scale(1)";
},120);
}

function updateTempBar(current,min,max){

if(max === min){
document.getElementById("temp-indicator").style.left = "50%";
return;
}

const percent = ((current-min)/(max-min))*100;
document.getElementById("temp-indicator").style.left = percent + "%";

}

function initRainEffect(){

const canvas = document.getElementById("rain-canvas");
if(!canvas) return;

const ctx = canvas.getContext("2d");

let drops = [];
let dropCount = 120;

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function createDrops(){
drops = [];

for(let i=0;i<dropCount;i++){
drops.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
len:10+Math.random()*20,
speed:4+Math.random()*6
});
}

}

createDrops();

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle="rgba(200,220,255,0.5)";
ctx.lineWidth=1;
ctx.lineCap="round";

for(let d of drops){

ctx.beginPath();
ctx.moveTo(d.x,d.y);
ctx.lineTo(d.x,d.y+d.len);
ctx.stroke();

d.y+=d.speed;

if(d.y>canvas.height){
d.y=-20;
d.x=Math.random()*canvas.width;
}

}

requestAnimationFrame(draw);

}

draw();

}

//document.addEventListener('contextmenu', function(event) {
   // event.preventDefault(); 
   // alert("Se ha desabilitado esta opción");
//}, false);
// Creamos una versión de prueba que use las 7 AM

document.addEventListener("DOMContentLoaded", initApp);

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("tab-btn")) return;

    document.querySelectorAll(".tab-btn").forEach(btn=>{
        btn.classList.remove("active");
    });

    e.target.classList.add("active");

    const type = e.target.dataset.tab;

    const cachedData = JSON.parse(localStorage.getItem("weather_cache_data"));

    if(cachedData){
        renderHourlyForecast(cachedData, type);
    }

});