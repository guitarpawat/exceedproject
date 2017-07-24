$(document).ready(function() {
  var link = "http://localhost/exceed/";

  function set(key,value) {
    var set = link+"?set="+key+","+value;
    $.ajax({
      url: set
    }).done(function() {

    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function get(key) {
    $.ajax({
      url: link+"?get="+key
    }).done(function(data) {
        console.log(data);
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function getIsBabyMove() {
    $.ajax({
      url: link+"?get=babyMove"
    }).done(function(data) {
        console.log(data);
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function getIsBabyCry() {
    $.ajax({
      url: link+"?get=babyCry"
    }).done(function(data) {
        console.log(data);
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function getSwingCradle() {
    $.ajax({
      url: link+"?get=swingCradle"
    }).done(function(data) {
        console.log(data);
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function getBuzzer() {
    $.ajax({
      url: link+"?get=buzzer"
    }).done(function(data) {
        console.log(data);
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };
});
