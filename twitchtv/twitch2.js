"use strict";
let twitchUsers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

let twitchUsersData = [];

function displayAll() {
  $("div.online, div.offline").removeClass("d-none");
}

function displayOnline() {
  $("div.offline").addClass("d-none");
  $("div.online").removeClass("d-none");
}

function displayOffline() {
  $("div.online").addClass("d-none");
  $("div.offline").removeClass("d-none");
}

function getUserData(userNameArray) {
  let requests = userNameArray.map(userName =>
    $.getJSON(
      `https://wind-bow.gomix.me/twitch-api/streams/${userName}?&callback=?`
    ).catch(err => err)
  );

  let userObjectArray = Promise.all(requests);
  return userObjectArray;
}

function displayStreams(userObject) {
  let channelName, streamTitle, status, imageLink, streamLink;

  if (userObject.stream) {
    let path = userObject.stream.channel;
    let streamGame = path.game;

    channelName = path.display_name;
    streamTitle = `${streamGame}  ${path.status}`;
    status = "online";
    imageLink = path.logo;
    streamLink = path.url;
  } else {
    channelName = userObject._links.channel.match(/\b\w+$/);
    streamTitle = "Offline";
    status = "offline";
    imageLink = "#";
    streamLink = `https://www.twitch.tv/${channelName[0].toLowerCase()}`;
  }

  let channelRow = `<div  id="${channelName}" class="row ${status} h100">  <div class="image col-2 my-auto"><img class="img-fluid" src="${imageLink}" alt="${channelName} logo"></div>
  <div class="channelName col-3 my-auto"><a href="${streamLink}" target="_blank" rel="noopener noreferrer"><h5>${channelName}</h5></a> </div> <div class="streamTitle col-7 my-auto"><h5>${streamTitle}</h5></div></div>`;
  $(`#${status}`).append(channelRow);
}

$(document).ready(function() {
  getUserData(twitchUsers).then(userObjectArray =>
    userObjectArray.forEach(userObject => displayStreams(userObject))
  );
});
