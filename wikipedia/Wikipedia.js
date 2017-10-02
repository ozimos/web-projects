"use strict";
function createSearchForm() {
  $("#searchIcon").html(
    '<form id="searchForm" action="https://en.wikipedia.org/w/api.php"><div class="input-group" method="get"> <input type="search" id="queryValue" name="searchBox" class="form-control mb-2 ml-4 mb-sm-0" autofocus><div class="input-group-addon"><span class="fa fa-times fa-3x" onclick="createSearchIcon()"></span></div><br> </div><input type="submit" value="Submit" style="display: none"></form>'
  );
  $("form").submit(submitSearchForm);
}

function submitSearchForm(event) {
  event.preventDefault(); //prevent default action
  $("#serverResults").empty();
  let getUrl = $(this).attr("action"); //get form action url
  let requestMethod = $(this).attr("method"); //get form GET/POST method
  let formData = $("#queryValue").val();
  let ajaxQuery = `${getUrl}?action=opensearch&format=json&origin=*&search=${formData}`;
  $.ajax({
    url: ajaxQuery,
    method: requestMethod,
    dataType: "json",
    success: htmlProcessor
  });
}

function createSearchIcon() {
  $("#searchForm").html(
    '<div id="searchIcon"><button role="button" onclick="createSearchForm()"><i class="fa fa-search fa-4x" aria-hidden="true"></i><br></button>  <h3> Click icon to search</h3></div>'
  );
  $("#serverResults").empty();
}

function htmlProcessor(response) {
  for (let i = 0; i < response[1].length; i++) {
    let card = `<a href= "${response[3][i]}" class="cardwrap" target="_blank"
  rel="noopener noreferrer"> `;
    card += '<div class="card"> <div class="card-block">';
    card += `<h4 class="card-title">${response[1][i]}</h4>`;
    card += `<p class="card-text">${response[2][i]}</p>`;
    card += "</div></div></a>";
    $("#serverResults").append(card);
  }
}
