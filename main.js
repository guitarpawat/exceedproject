$(document).ready(function() {
  var link = "http://192.168.137.1/exceed/";
  var swing,sound;

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
        else if(data == 0) {
          $("#cry-pic").attr("src","./assets/img/cry0.png");
          $("#cry-txt").html("Not crying.");
        }
        else {
          $("#cry-pic").attr("src","./assets/img/cry.png");
          $("#cry-txt").html("No data.");
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
      swing = data;
      if(data == 1) {
        $("#swing-pic").attr("src","./assets/img/cradle1.png");
        $("#swing-txt").html("The cradle is swinging.");
      }
      else if(data == 0) {
        $("#swing-pic").attr("src","./assets/img/cradle0.png");
        $("#swing-txt").html("Not swinging.");
      }
      else {
        $("#swing-pic").attr("src","./assets/img/cradle.png");
        $("#swing-txt").html("No data.");
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
      sound = data;
      if(data == 1) {
        $("#music-pic").attr("src","./assets/img/music1.png");
        $("#music-txt").html("The music is playing.");
      }
      else if(data == 0) {
        $("#music-pic").attr("src","./assets/img/music0.png");
        $("#music-txt").html("Not playing.");
      }
      else {
        $("#music-pic").attr("src","./assets/img/play.png");
        $("#music-txt").html("No data.");
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

  function setSound(i) {
    if(i==0 || i==1 || i==2) {
      set("se_sound",i);
    }
    else {
      console.error("Invalid int");
    }
  };

  function setSwing(i) {
    if(i==0 || i==1 || i==2) {
      set("se_swing",i);
    }
    else {
      console.error("Invalid int");
    }
  };

  setInterval(get,1000);

  $("#swing-pic").click(function() {
    if(swing == 0) set("se_swing",1);
    else if(swing == 1) set("se_swing",0);
  });

  $("#music-pic").click(function() {
    if(sound == 0) set("se_sound",1);
    else if(sound == 1) set("se_sound",0);;
  });
});
