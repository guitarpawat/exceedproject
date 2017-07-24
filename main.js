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

  function getCry() {
    $.ajax({
      url: link+"?get=ar_cry"
    }).done(function(data) {
        if(data == 1) {
          $("#cry-pic").attr("src","./assets/img/cry1.png");
          $("#cry-txt").html("The baby is crying.");
        }
        if(data == 0) {
          $("#cry-pic").attr("src","./assets/img/cry0.png");
          $("#cry-txt").html("Not crying.");
        }
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function getSwing() {
    $.ajax({
      url: link+"?get=ar_swing"
    }).done(function(data) {
      if(data == 1) {
        $("#swing-pic").attr("src","./assets/img/cradle1.png");
        $("#swing-txt").html("The cradle is swinging.");
      }
      if(data == 0) {
        $("#swing-pic").attr("src","./assets/img/cradle0.png");
        $("#swing-txt").html("Not swinging.");
      }
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function getSound() {
    $.ajax({
      url: link+"?get=ar_sound"
    }).done(function(data) {
      if(data == 1) {
        $("#sound-pic").attr("src","./assets/img/music1.png");
        $("#sound-txt").html("The music is playing.");
      }
      if(data == 0) {
        $("#sound-pic").attr("src","./assets/img/music0.png");
        $("#sound-txt").html("Not playing.");
      }
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );
  };

  function get() {
    getCry();
    getSwing();
    getSound();
  };

  window.get = get;

  // setInterval(get,1000);

});
