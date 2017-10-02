"use strict";

let temperatureCelsius = 0;
let temperatureFahrenheit = 0;
let wurl = "https://fcc-weather-api.glitch.me/api/current?";

function convertTemperature() {
  if ($("button").html() === "°F") {
    $("button").html("&degC");
    $("#temp").html(temperatureCelsius);
  } else {
    $("button").html("&degF");
    $("#temp").html(temperatureFahrenheit);
  }
}

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoords.bind(this, callback));
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function setCoords(callback, position) {
  let lat = Math.round(position.coords.latitude * 100) / 100;
  let lon = Math.round(position.coords.longitude * 100) / 100;
  wurl += `lat=${lat}&lon=${lon}`;
  callback();
}

function getWeather() {
  $.ajax({
    url: wurl,
    dataType: "json",
    success: processWeatherData
  });
}

function processWeatherData(response) {
  $("img").attr("src", response.weather[0].icon);
  let locationName = response.name + "," + response.sys.country;
  $("#city").html(locationName);
  temperatureCelsius = Math.round(response.main.temp * 10) / 10;
  temperatureFahrenheit = Math.round(temperatureCelsius * 18 + 320) / 10;
  $("#temp").text(temperatureCelsius);
  $("button").click(convertTemperature);
}

$(document).ready(function() {
  let linkBackGroundColor = $("body").css("background-color");
  getLocation(getWeather);
});
