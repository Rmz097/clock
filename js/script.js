/**
 * CALENDARIO UNIFICADO, CLIMA Y ESTADÍSTICAS
 * Versión Final: Animación de puntos y resaltado verde 5s.
 */

// ======================================
// 1. CONFIGURACIÓN Y SANTORAL
// ======================================
const Santoral = {
    1: { 1: "Santa María Madre de Dios", 2: "San Basilio Magno y San Gregorio Nacianceno", 3: "Santo Tomás de Aquino", 4: "Santa Ángela de Foligno", 5: "San Juan Nepomuceno Neumann", 6: "Epifanía del Señor (Reyes Magos)", 7: "San Raimundo de Peñafort", 8: "San Severino", 9: "San Eulogio de Córdoba", 10: "San Gregorio X, Papa", 11: "San Teodosio Cenobiarca", 12: "San Benito Biscop", 13: "San Hilario de Poitiers", 14: "San Félix de Nola", 15: "San Pablo Eremita", 16: "San Marcelo I", 0: "San Antonio Abad", 18: "Santa Prisca", 19: "San Mario y Santa Marta", 20: "San Fabián, Papa y San Sebastián", 21: "Santa Inés de Roma", 22: "San Vicente de Zaragoza", 23: "San Ildefonso de Toledo", 24: "San Francisco de Sales", 25: "Conversión de San Pablo", 26: "San Timoteo y San Tito", 27: "Santa Ángela de Mérici", 28: "Santo Tomás de Aquino", 29: "San Francisco de Sales", 30: "Santa Martina", 31: "San Juan Bosco" },
    2: { 1: "Santa Brígida de Kildare", 2: "Presentación del Señor (Candelaria)", 3: "San Blas de Sebaste", 4: "San Gilberto de Sempringham", 5: "Santa Águeda de Catania", 6: "San Pablo Miki y compañeros", 7: "San Ricardo, Rey", 8: "San Jerónimo Emiliani", 9: "Santa Apolonia", 10: "Santa Escolástica", 11: "Nuestra Señora de Lourdes", 12: "Santa Eulalia de Barcelona", 13: "San Benigno de Todi", 14: "San Cirilo y San Metodio", 15: "San Claudio de la Colombière", 16: "Santa Juliana de Florencia", 0: "Los Siete Fundadores de la Orden de los Servitas", 18: "San Simeón", 19: "San Conrado de Piacenza", 20: "San Eleuterio", 21: "San Pedro Damián", 22: "Cátedra de San Pedro", 23: "San Policarpo de Esmirna", 24: "San Sergio y San Baco", 25: "Santa Walburga", 26: "San Néstor", 27: "San Gabriel de Nuestra Señora de los Dolores", 28: "San Román Abad", 29: "San Osvaldo de Worcester" },
    3: { 1: "San Albino de Angers", 2: "Santa Inés de Bohemia", 3: "Santa Catalina Drexel", 4: "San Casimiro de Polonia", 5: "San Juan José de la Cruz", 6: "Santa Rosa de Viterbo", 7: "Santas Perpetua y Felicidad", 8: "San Juan de Dios", 9: "Santa Francisca Romana", 10: "San Cayo y San Alejandro", 11: "Santa Sofronia", 12: "San Maximiliano", 13: "Santa Eufrasia de Constantinopla", 14: "Santa Matilde", 15: "San Longino", 16: "Santa Heriberto de Colonia", 0: "San Patricio de Irlanda", 18: "San Cirilo de Jerusalén", 19: "San José, Esposo de la Virgen María", 20: "San Martín de Braga", 21: "San Nicolás de Flüe", 22: "Santa Lea de Roma", 23: "San Toribio de Mogrovejo", 24: "Santa Catalina de Suecia", 25: "Anunciación del Señor", 26: "San Manuel de Creta", 27: "San Ruperto de Salzburgo", 28: "San Sixto III", 29: "San Jonás", 30: "San Juan Clímaco", 31: "Santa Balbina" },
    4: { 1: "San Hugo de Grenoble", 2: "San Francisco de Paula", 3: "San Sixto I", 4: "San Isidoro de Sevilla", 5: "San Vicente Ferrer", 6: "San Pedro de Verona", 7: "San Juan Bautista de La Salle", 8: "Santa Julia Billiart", 9: "Santa María de Cleofás", 10: "San Miguel de los Santos", 11: "San Estanislao de Cracovia", 12: "San Julio I", 13: "San Martín I, Papa", 14: "San Telmo", 15: "Santa Anastasia", 16: "Santa Bernadette Soubirous", 0: "Santa Kateri Tekakwitha", 18: "San Perfecto de Córdoba", 19: "San Abraham", 20: "San Teotimo", 21: "San Anselmo de Canterbury", 22: "San Cayo y San Sotero", 23: "San Jorge, Mártir", 24: "San Fidel de Sigmaringa", 25: "San Marcos Evangelista", 26: "Nuestra Señora del Buen Consejo", 27: "Santa Zita de Lucca", 28: "San Luis María Grignion de Montfort", 29: "Santa Catalina de Siena", 30: "San Pío V, Papa" },
    5: { 1: "San José Obrero", 2: "San Atanasio", 3: "San Felipe y Santiago el Menor", 4: "San Florián", 5: "San Hilarión de Gaza", 6: "San Juan ante Portam Latinam", 7: "San Juan de Beverley", 8: "Nuestra Señora de Luján", 9: "San Pacomio", 10: "San Juan de Ávila", 11: "San Mamerto de Vienne", 12: "San Nereo y San Aquiles", 13: "Nuestra Señora de Fátima", 14: "San Matías Apóstol", 15: "San Isidro Labrador", 16: "San Ubaldo", 0: "San Pascual Bailón", 18: "San Juan I, Papa", 19: "San Crispín de Viterbo", 20: "San Bernardino de Siena", 21: "San Cristóbal Magallanes y compañeros mártires", 22: "Santa Rita de Casia", 23: "San Desiderio de Langres", 24: "María Auxiliadora", 25: "San Beda el Venerable", 26: "San Felipe Neri", 27: "San Agustín de Canterbury", 28: "San Germán de París", 29: "San Maximino de Tréveris", 30: "Santa Juana de Arco", 31: "Visitación de la Virgen María" },
    6: { 1: "San Justino, Mártir", 2: "San Marcelino y San Pedro", 3: "San Carlos Lwanga y compañeros mártires", 4: "San Francisco Caracciolo", 5: "San Bonifacio", 6: "San Norberto", 7: "San Roberto de Newminster", 8: "San Maximino de Aix", 9: "San Efrén de Siria", 10: "San Landerico de París", 11: "San Bernabé Apóstol", 12: "San Juan de Sahagún", 13: "San Antonio de Padua", 14: "San Eliseo", 15: "Santa Germana Cousin", 16: "Santa Lutgarda", 0: "San Alberto Chmielowski", 18: "San Gregorio Barbarigo", 19: "San Romualdo", 20: "San Silvano", 21: "San Luis Gonzaga", 22: "San Juan Fisher y Santo Tomás Moro", 23: "Santa Etheldreda", 24: "Natividad de San Juan Bautista", 25: "Santa Soledad", 26: "San Josemaría Escrivá de Balaguer", 27: "San Cirilo de Alejandría", 28: "San Ireneo de Lyon", 29: "San Pedro y San Pablo, Apóstoles", 30: "Los Primeros Mártires de la Iglesia de Roma" },
    7: { 1: "San Aarón", 2: "San Bernardino Realino", 3: "Santo Tomás Apóstol", 4: "Santa Isabel de Portugal", 5: "San Antonio María Zaccaría", 6: "Santa María Goretti", 7: "San Fermín de Amiens", 8: "San Eugenio III, Papa", 9: "Santa Verónica Giuliani", 10: "Santa Felicidad", 11: "San Benito de Nursia", 12: "San Juan Gualberto", 13: "San Enrique II", 14: "San Camilo de Lelis", 15: "San Buenaventura", 16: "Nuestra Señora del Carmen", 0: "Santa Marcelina", 18: "San Camilo de Lelis", 19: "San Vicente de Paúl", 20: "San Apolinar de Rávena", 21: "San Lorenzo de Brindis", 22: "Santa María Magdalena", 23: "Santa Brígida de Suecia", 24: "San Charbel Makhlouf", 25: "Santiago Apóstol", 26: "San Joaquín y Santa Ana", 27: "San Pantaleón", 28: "San Víctor I, Papa", 29: "Santa Marta, Santa María y San Lázaro", 30: "San Pedro Crisólogo", 31: "San Ignacio de Loyola" },
    8: { 1: "San Alfonso María de Ligorio", 2: "San Eusebio de Vercelli", 3: "Santa Lidia", 4: "San Juan María Vianney (Cura de Ars)", 5: "Dedicación de Santa María la Mayor", 6: "Transfiguración del Señor", 7: "San Sixto II, Papa y compañeros mártires", 8: "Santo Domingo de Guzmán", 9: "Santa Teresa Benedicta de la Cruz (Edith Stein)", 10: "San Lorenzo, Mártir", 11: "Santa Clara de Asís", 12: "Santa Juana de Chantal", 13: "San Ponciano y San Hipólito", 14: "San Maximiliano María Kolbe", 15: "Asunción de la Virgen María", 16: "San Esteban de Hungría", 0: "San Jacinto de Polonia", 18: "Santa Elena", 19: "San Juan Eudes", 20: "San Bernardo de Claraval", 21: "San Pío X, Papa", 22: "Santa María Reina", 23: "Santa Rosa de Lima", 24: "San Bartolomé Apóstol", 25: "San Luis IX de Francia", 26: "San Ceferino, Papa", 27: "Santa Mónica", 28: "San Agustín de Hipona", 29: "Martirio de San Juan Bautista", 30: "San Felix", 31: "San Ramón Nonato" },
    9: { 1: "San Josué", 2: "Santa Rachel", 3: "San Gregorio Magno", 4: "Santa Rosa de Viterbo", 5: "Santa Teresa de Calcuta", 6: "San Zacarías", 7: "San Clodoaldo", 8: "Natividad de la Virgen María", 9: "San Pedro Claver", 10: "San Nicolás de Tolentino", 11: "San Proto y San Jacinto", 12: "Dulce Nombre de María", 13: "San Juan Crisóstomo", 14: "Exaltación de la Santa Cruz", 15: "Nuestra Señora de los Dolores", 16: "San Cornelio y San Cipriano", 0: "San Roberto Belarmino", 18: "San Ricardo de Wessex", 19: "San Jenaro", 20: "San Andrés Kim Taegon y compañeros mártires", 21: "San Mateo Apóstol y Evangelista", 22: "San Mauricio", 23: "San Pío de Pietrelcina (Padre Pío)", 24: "Nuestra Señora de la Merced", 25: "San Cleofás", 26: "San Cosme y San Damián", 27: "San Vicente de Paúl", 28: "San Wenceslao", 29: "San Miguel, San Gabriel y San Rafael, Arcángeles", 30: "San Jerónimo" },
    10: { 1: "Santa Teresita del Niño Jesús", 2: "Santos Ángeles Custodios", 3: "San Francisco de Borja", 4: "San Francisco de Asís", 5: "Santa Faustina Kowalska", 6: "San Bruno de Colonia", 7: "Nuestra Señora del Rosario", 8: "Santa Pelagia", 9: "San Dionisio y compañeros mártires", 10: "San Francisco de Paula", 11: "San Juan XXIII, Papa", 12: "Nuestra Señora del Pilar (Día de la Hispanidad)", 13: "San Eduardo el Confesor", 14: "San Calixto I, Papa", 15: "Santa Teresa de Jesús (de Ávila)", 16: "Santa Eduviges", 0: "San Ignacio de Antioquía", 18: "San Lucas Evangelista", 19: "San Pablo de la Cruz", 20: "San Artemio", 21: "Santa Úrsula y compañeras", 22: "San Juan Pablo II, Papa", 23: "San Juan de Capistrano", 24: "San Antonio María Claret", 25: "San Crisanto y Santa Daría", 26: "San Rogaciano y San Felicísimo", 27: "San Frumentio", 28: "San Simón y San Judas, Apóstoles", 29: "San Narciso de Jerusalén", 30: "San Marcelo de Tánger", 31: "San Quintín" },
    11: { 1: "Todos los Santos", 2: "Conmemoración de los Fieles Difuntos", 3: "San Martín de Porres", 4: "San Carlos Borromeo", 5: "Santa Isabel, madre de San Juan Bautista", 6: "San Leonardo de Noblac", 7: "San Ernesto", 8: "Beato Juan Duns Scoto", 9: "Dedicación de la Basílica de Letrán", 10: "San León Magno", 11: "San Martín de Tours", 12: "San Josafat", 13: "San Diego de Alcalá", 14: "San Nicolás Tavélic", 15: "San Alberto Magno", 16: "Santa Margarita de Escocia", 0: "Santa Isabel de Hungría", 18: "Dedicación de San Pedro y San Pablo", 19: "Santa Matilde de Hackeborn", 20: "San Félix de Valois", 21: "Presentación de la Virgen María", 22: "Santa Cecilia", 23: "San Clemente I", 24: "San Andrés Dung Lac y compañeros mártires", 25: "Santa Catalina de Alejandría", 26: "San Silvestre Gozzolini", 27: "Nuestra Señora de la Medalla Milagrosa", 28: "Santa Catalina Labouré", 29: "San Saturnino", 30: "San Andrés Apóstol" },
    12: { 1: "San Eloy", 2: "Santa Bibiana / San Ponciano", 3: "San Francisco Javier", 4: "Santa Bárbara / San Juan Damasceno", 5: "San Sabás", 6: "San Nicolás de Bari", 7: "San Ambrosio de Milán", 8: "Inmaculada Concepción", 9: "San Juan Diego Cuauhtlatoatzin", 10: "Nuestra Señora de Loreto", 11: "San Dámaso I", 12: "Nuestra Señora de Guadalupe", 13: "Santa Lucía", 14: "San Juan de la Cruz", 15: "Santa Cristina", 16: "Santa Adelaida", 0: "San Lázaro", 18: "Nuestra Señora de la Esperanza", 19: "San Urbano V", 20: "Santo Domingo de Silos", 21: "San Pedro Canisio", 22: "Santa Francisca Javier Cabrini", 23: "San Antonio de Santa Ana Galvao", 24: "Nochebuena", 25: "Natividad del Señor (Navidad)", 26: "San Esteban Protomártir", 27: "San Juan Apóstol y Evangelista", 28: "Santos Inocentes", 29: "Santo Tomás Becket", 30: "Santa Judit / San Sabino", 31: "San Silvestre I" },
};

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
        cell.innerHTML = `<span class="day-number">${dateCounter}</span><span class="santoral-text">${Santoral[month + 1]?.[dateCounter] || ""}</span>`;
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
        const aqiEl = document.getElementById("aqi-value");
        const aqiDescEl = document.getElementById("aqi-desc");
        
        if (aqiEl) aqiEl.textContent = airData.aqi;
        if (aqiDescEl) {
            aqiDescEl.textContent = airData.desc;
            // Opcional: Cambiar color según el índice
            aqiDescEl.style.color = airData.aqi > 60 ? "#e74c3c" : "#2ecc71";
        }
        // Guardar para que el audio lo use
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
    const santo = Santoral[now.getMonth() + 1]?.[now.getDate()] || "N/A";
    if (nodes.santoDay) nodes.santoDay.textContent = santo;
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
        santoDay: document.getElementById("santo-day"),
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