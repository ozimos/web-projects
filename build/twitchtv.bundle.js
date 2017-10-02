"use strict";

var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

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
  var userObjectArray = void 0;

  var requests = userNameArray.map(function (userName) {
    return fetch("https://wind-bow.gomix.me/twitch-api/streams/" + userName).catch(function (err) {
      return err;
    });
  });

  Promise.all(requests).then(function (responses) {
    userObjectArray = Promise.all(responses.map(function (r) {
      return r.json();
    }));
    // all responses are ready, we can show HTTP status codes

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = responses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var response = _step.value;

        console.log(response.url + ": " + response.status); // shows 200 for every url
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return userObjectArray;
  });
  return userObjectArray;
}

function displayStreams(userObject) {
  var channelName = void 0,
      streamTitle = void 0,
      status = void 0,
      imageLink = void 0,
      streamLink = void 0;

  if (userObject.stream) {
    var path = userObject.stream.channel;
    var streamGame = path.game;

    channelName = path.display_name;
    streamTitle = streamGame + "  " + path.status;
    status = "online";
    imageLink = path.logo;
    streamLink = path.url;
  } else {
    channelName = userObject._links.channel.match(/\b\w+$/);
    streamTitle = "Offline";
    status = "offline";
    imageLink = "#";
    streamLink = "https://www.twitch.tv/" + channelName[0].toLowerCase();
  }

  var channelRow = "<div  id=\"" + channelName + "\" class=\"row " + status + " h100\">  <div class=\"image col-2 my-auto\"><img class=\"img-fluid\" src=\"" + imageLink + "\" alt=\"" + channelName + " logo\"></div>\n<div class=\"channelName col-3 my-auto\"><a href=\"" + streamLink + "\" target=\"_blank\" rel=\"noopener noreferrer\"><h5>" + channelName + "</h5></a> </div> <div class=\"streamTitle col-7 my-auto\"><h5>" + streamTitle + "</h5></div></div>";
  $("#" + status).append(channelRow);
}

$(document).ready(function () {
  getUserData(twitchUsers).then(function (userObjectArray) {
    return userObjectArray.forEach(function (userObject) {
      return displayStreams(userObject);
    });
  });
});
