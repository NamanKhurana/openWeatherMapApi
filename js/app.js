class AjaxWeather {
    constructor() {
        this.apiKey = "92a7f71ec494f4020ebdeec0de371ddb";
    }

    async getWeather(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`
        const weatherData=await fetch(url)
        const weather=await weatherData.json();
        return weather
    }
}

class Display
{
    constructor()
    {
        this.results = document.querySelector(".results")
        this.cityName = document.getElementById("cityName")
        this.cityCountry = document.getElementById("cityCountry")
        this.cityIcon = document.getElementById("cityIcon")
        this.cityTemp = document.getElementById("cityTemp")
        this.cityHumidity = document.getElementById("cityHumidity")
    }

    showWeather(data)
    {
        const {name,sys:{country},main:{temp,humidity}} = data
        const {icon} = weather[0];

        this.results.classList.add("showItem")
        this.cityName.textContent=name;
        this.cityCountry.textContent=temp;
        this.cityHumidity.textContent=humidity
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}`
    }
}

(function () {
    const form = document.getElementById("weatherForm")
    const cityInput = document.getElementById("cityInput")
    const feedback = document.querySelector(".feedback")

    //CLASS
   const ajax = new AjaxWeather()

    form.addEventListener("submit", (event) => {
        console.log("hello")
        event.preventDefault();

        const city = cityInput.value;

        if (city.length === 0) {
            showFeedback("City value cannot be empty")
        }
        else {
             ajax.getWeather(city).then(data => console.log(data))
        }

        function showFeedback(test) {
            feedback.classList.add("showItem")
            feedback.innerHTML = `<p>${test}</p>`
        }

        setTimeout(() => {
            feedback.classList.remove("showItem");
        }, 2000)
    })
})()