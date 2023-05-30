 const weatherInfo = document.getElementById("weatherContainer");
 const searchInput = document.getElementById("search");
 const searchBtn = document.getElementById("searchBtn");
 let showCity =document.getElementById("city");
    
 
placeholder()
setTimeAndDate();
searchBtn.addEventListener ("click", e => {
    fetchWeather(searchInput.value);
    
})
 //ta bort texten i sökrutan när du klickar på input fältet
searchInput.addEventListener("click", () => {
    searchInput.value = '';
})




//funktion för tid och dag
function setTimeAndDate () {
      //pilfunktion för att sätta tiden. OBS!!! anpassar sig inte efter tidszoner
   let ShowDateTime = document.getElementById("dateTime")
   setInterval(() => {
        let currentTime = new Date().getTime();
        let time = new Date(currentTime).toLocaleTimeString()
      
        //uppdelning för att skriva ut datum i rätt ordning
        let showDate = new Date();
        let day = showDate.getDate();
        let month = showDate.getMonth() + 1;
        let year = showDate.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
    ShowDateTime.innerHTML = "Date: " + currentDate + ", Time: " +  time;
}, 1000) }
      
  setInterval(() => {
        fetchWeather(searchInput.value)
    }, 30 * 60 * 1000);

//funktion som hämtar vädret från API
function fetchWeather(city) {
  
  const api = fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9") 
    .then((respons) => respons.json())
    .then((json) => displayWeather(json))

    if (city === undefined) {
        showCity.innerHTML = ""
    }


};

//funktion för vad för väder information som ska vissas
function displayWeather (display) {
    

    showCity.innerText= display.name;
  
    let showTemp = document.getElementById("temp");
        showTemp.innerText= Math.round(display.main.temp) + " °C";

    let showDescription = document.getElementById("description");
    showDescription.innerText=display.weather[0].description;

    //let showIcon = document.getElementById("description");
    //showIcon.innerText=display.weather[0].icon;

    let showWind = document.getElementById("wind");
    showWind.innerText= "Vindhastighet: " + display.wind.speed + " m/s ";
   
    let showHumidity = document.getElementById("humidity");
    showHumidity.innerText= "Luftfuktighet: " + display.main.humidity + "%";  
   
    let showPressure = document.getElementById("pressure");
    showPressure.innerText= "Lufttryck: " + display.main.pressure + " hPa ";
   
   
}
//skriver ut vädret i göteborg tills någon har sökt 
function placeholder() {
    const api = fetch("https://api.openweathermap.org/data/2.5/weather?q=göteborg&units=metric&lang=se&appid=3ee1fe60512466d911afa2c70e2190c9") 
    .then((respons) => respons.json())
    .then((json) => displayWeather(json))
}

