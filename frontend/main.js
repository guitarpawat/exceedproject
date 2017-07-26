$(document).ready(function() {
  var link = "http://192.168.137.1/exceed/";
  var swing,sound;
  var n = 0;
  var isWake = true;

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

  function renderStat(dn,dwake) {
    if(dn == 0) {
      $("#stat-pic").attr("src","./assets/img/stat0.png");
      $("#stat-txt").html("Average sleeping time :<br/>No stat");
    }
    else {
      $("#stat-pic").attr("src","./assets/img/stat1.png");
      $("#stat-txt").html("Average sleeping time :<br/>"+(dn/dwake/32).toFixed(2)+" hours");
    }
  };

  function initStat() {
    $.ajax({
      url: link+"?get=n"
    }).done(function(dn) {
      $.ajax({
        url: link+"?get=wake"
      }).done(function(dwake) {
        renderStat(parseInt(dn),parseInt(dwake));
      }).fail(function() {
        console.error("Cannot connect to server.");
      });
    }).fail(function() {
      console.error("Cannot connect to server.");
    });
  };

  function getCry() {
    var data1;
    $.ajax({
      url: link+"?get=ar_cry"
    }).done(function(data1) {
      $.ajax({
        url: link+"?get=ar_move"
      }).done(function(data2) {
        if(data1 == 1 || data2 == 1) {
          $("#cry-pic").attr("src","./assets/img/wake.png");
          $("#cry-txt").html("The baby is wake up.");
          if(!isWake) {
            $.ajax({
              url: link+"?get=n"
            }).done(function(dn) {
              $.ajax({
                url: link+"?get=wake"
              }).done(function(dwake) {
                var tmp = parseInt(dn)+parseInt(n);
                renderStat(tmp,parseInt(dwake)+1);
                set("n",tmp);
                set("wake",parseInt(dwake)+1);
                n = 0;
              }).fail(function() {
                console.error("Cannot connect to server.");
              });
            }).fail(function() {
              console.error("Cannot connect to server.");
            });
          }
          isWake = true;
        }
        else if(data1 == 0 && data2 == 0) {
          $("#cry-pic").attr("src","./assets/img/sleep.png");
          $("#cry-txt").html("The baby is sleeping.");
          n++;
          isWake = false;
        }
        else {
          $("#cry-pic").attr("src","./assets/img/cry.png");
          $("#cry-txt").html("No data.");
        }
      }).fail(function() {
          console.error("Cannot connect to server.");
        }
      );
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

  function getTemp() {
    $.ajax({
      url: link+"?get=ar_temp"
    }).done(function(data) {
        $("#temp-pic").attr("src","./assets/img/temp.png");
        $("#temp-txt").html("Temperature :<br/>"+data+" ℃");
    }).fail(function() {
        console.error("Cannot connect to server.");
      }
    );

  };


  function get() {
    getCry();
    getSwing();
    getSound();
    getTemp();
  };

  function init() {
    get();
    initStat();
  }

  init();

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

  setInterval(get,500);

  $("#swing-pic").click(function() {
    if(swing == 0) set("se_swing",1);
    else if(swing == 1) set("se_swing",0);
  });

  $("#music-pic").click(function() {
    if(sound == 0) set("se_sound",1);
    else if(sound == 1) set("se_sound",0);;
  });

});
