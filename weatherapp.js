const weatherInfo = document.getElementById("weatherContainer");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const mainInfo = document.getElementsByClassName("mainInformation")
const showCity = document.getElementById("city");

let timeInterval = null;

fetchPlaceholder();

setInterval(() => {
    fetchWeather(searchInput.value)
}, 30 * 60 * 1000);

//////////// event Listener //////////////////

searchBtn.addEventListener("click", e => {
    fetchWeather(searchInput.value)
})

//ta bort texten i sökrutan när du klickar på input fältet
searchInput.addEventListener("click", () => {
    searchInput.value = '';
})

///////////////funktioner///////////////

//skriver ut vädret i göteborg tills ny sökning görs
function fetchPlaceholder() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=göteborg&units=metric&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9")
        .then((respons) => respons.json())
        .then((json) => displayWeather(json))
}

//funktion som hämtar vädret beroende på vilken stad man söker på. ingen limit vart i värden man vill kolla vädret 
function fetchWeather(city) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9")
        .then(response => {
            if (response.status !== 200) {
                document.querySelector(".errorMessage").style.display = "block";
                weatherInfo.style.display = "none";

            } else {
                weatherInfo.style.display = "block";
                document.querySelector(".errorMessage").style.display = "none";
                return response.json()
            }
            return response.json()
        })

        .then((json) => displayWeather(json))

};

//funktion - vilken väder information som ska vissas
function displayWeather(display) {
    //settTimeAndDate skapar tid och datum som anpassade till vilket tidzon staden man söker är i 
    setTimeAndDate(display.timezone / 60); // tidzonen skriver ut sitt värde i sekunder och vi behöver ha värde i minuter därför delar vi tidzonen på 60. 

    showCity.innerText = display.name;

    let showTemp = document.getElementById("temp");
    showTemp.innerText = Math.round(display.main.temp) + " °C";

    let showDescription = document.getElementById("description");
    showDescription.innerText = display.weather[0].description;

    const icon = document.getElementById("icon");
    icon.src = "https://openweathermap.org/img/wn/" + display.weather[0].icon + "@2x.png";

    let showWind = document.getElementById("wind");
    showWind.innerText = "Vindhastighet: " + display.wind.speed + " m/s ";

    let showHumidity = document.getElementById("humidity");
    showHumidity.innerText = "Luftfuktighet: " + display.main.humidity + "%";

    let showPressure = document.getElementById("pressure");
    showPressure.innerText = "Lufttryck: " + display.main.pressure + " hPa ";

}
// uppdaterar sidan var 30 minut 

//funktion för tid och datum
function setTimeAndDate(timezone) {
    let ShowDateTime = document.getElementById("dateTime")
    if (timeInterval !== null) {
        clearInterval(timeInterval);
    }

    timeInterval = setInterval(() => {

        let showDate = calculateTime(120, timezone, new Date());
        let day = showDate.getDate().toString().padStart(2, "0");
        let month = showDate.getMonth() + 1
        let month2 = month.toString().padStart(2, "0");
        let year = showDate.getFullYear();
        let currentDate = `${day}-${month2}-${year}`;
        ShowDateTime.innerHTML = "Datum: " + currentDate + ", Tid: " + showDate.toLocaleTimeString();
    }, 1000)
}

function calculateTime(myOffset, timeZoneOffset, date) {
    const minInMillis = 60 * 1000;
    const timestamp = date.getTime();

    const diff = myOffset - timeZoneOffset;

    let newTimestamp = timestamp - diff * minInMillis;
    return new Date(newTimestamp);
}




