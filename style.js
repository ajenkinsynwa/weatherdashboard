// set a global variable 

const searchedCities = [];

function GetInfo() {
    const newName = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    cityName.innerHTML = " " + newName.value + " ";

    //store newName in local storage
    
    const searchedCity = newName.value;
    searchedCities.push(searchedCity);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));


    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=242b7b97630587c4368b58d6f02e6a80&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min")
                    .innerHTML = "Min:" + Number(data.list[i].main.temp_min)
                        .toFixed(1) + "°";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max")
                    .innerHTML = "Max: " + Number(data.list[i].main.temp_max)
                        .toFixed(2) + "°" + "<br>"+ "Humidity:" + data.list[i].main.humidity + "<br>"+ "Windspeed: " + data.list[i].wind.speed;
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon + ".png";
            }
            console.log(data)
        })
        .catch(err => alert("Something Went Wrong"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Charlotte";
    GetInfo();
}

var d = new Date();
var weekday = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDate() - 7;
    }
    else {
        return day + d.getDate();
    }
}