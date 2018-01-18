//task list for code
// -fix the delay that is brought in with the ifmouseClicked function yminMap variables are used for the next person
//- get your own location from the getGeolocation thing

//location variables these should in the end come directly from your phone/computer
var me = [{ name: "maud", x: 11.316899, y: 50.979899 }];

var friends = [{ name: "Your Colour", x: 0.0, y: 0.0 }];

var places = [
  {
    name: "weimar",
    xmin: 11.270731,
    xmax: 11.365145,
    ymin: 50.94172,
    ymax: 51.037671,
    maxDist: 8
  },
  {
    name: "germany",
    xmin: 5.866806,
    xmax: 15.041296,
    ymin: 47.270213,
    ymax: 55.056444,
    maxDist: 1200
  },
  {
    name: "europe",
    xmin: -9.499529,
    xmax: 31.583442,
    ymin: 34.80311,
    ymax: 70.082605,
    maxDist: 6000
  },
   {
    name: "world",
    xmin: -180,
    xmax: 180,
    ymin: -90,
    ymax: 90,
    maxDist: 20000
  }
];

var friend_index = 0;
var place_index = 0;

var middlepoint;
var colH;
var colS;
var colB;
var angleNum;
var distan;
var dX;
var dY;

var radE = 30;
var rr = 6371; // Radius of the earth in km

var loc1X;
var loc1Y;
var loc2X;
var loc2Y;
var yminMap;
var ymaxMap;
var xminMap;
var xmaxMap;
var maxDista;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  //background(200,10,30);

  if(navigator.geolocation)
  {
    var nav_options = {enableHighAccuracy: true,
                       timeout: 5000,
                       maximumAge: 1000};

    var nav_id =
    navigator.geolocation.watchPosition(position_changed,nav_error,nav_options);
  }
     document.body.addEventListener('touchend', touchend, false);
}

function position_changed(pos)
{
  friends.x = pos.coords.longitude;
  console.log(friends.x);
  friends.y = pos.coords.latitude;
}

function nav_error(error)
{
  switch(error.code)
  {
      case error.PERMISSION_DENIED:
          x.innerHTML = "You denied access";
          break;
      case error.POSITION_UNAVAILABLE:
          x.innerHTML = "The position is unfortunately not available at this time";
          break;
      case error.TIMEOUT:
          x.innerHTML = "Taking too long";
          break;
      case error.UNKNOWN_ERROR:
          x.innerHTML = "Huh?!";
          break;
  }
}

function draw() {
  //loc2X = friends[friend_index].x;
  //loc2Y = friends[friend_index].y;
  loc1X = 15.041226;
  loc1Y = me[0].y;

  loc2X = friends.x;
  loc2Y = friends.y;

  for (var i=0; i<places.length; i++) {


    if (
    loc2X < places[place_index].xmax &&
    loc2X > places[place_index].xmin &&
    loc2Y > places[place_index].ymin &&
    loc2Y < places[place_index].ymax
  ) {
    xminMap = places[place_index].xmin;
    xmaxMap = places[place_index].xmax;
    yminMap = places[place_index].ymin;
    ymaxMap = places[place_index].ymax;
    maxDista = places[place_index].maxDist;
  }
  console.log(loc2X);
  }

  colorMode(HSB);

  middlepoint = getCendroid();
  colH = map(middlepoint, xminMap, ymaxMap, 0, 360);
  distan = getDistance();
  colS = map(distan, 0, maxDista, 0, 100);
  angleNum = getAngle();
  colB = map(angleNum, -360, 360, 0, 100);
  drawBackground();
  textSize(32);
  noStroke();
  fill(360 - colH, 100 - colS, 100 - colB);
  text(friends[friend_index].name, 200, 400);
}

//first color comes from the middlepoint of the two locations translated to a HUE value
function getCendroid() {
  dX = (loc1X + loc2X) / 2;
  var dYloc1Y = map(loc1Y, yminMap, ymaxMap, xminMap, xmaxMap);
  var dYloc2Y = map(loc2Y, yminMap, ymaxMap, xminMap, xmaxMap);
  dY = (dYloc1Y + dYloc2Y) / 2;
  var cend = atan(dX / dY);
  return cend;
}

//second input comes from the distance between the two points this forms the saturation value
function getDistance() {
  var dLat = deg2rad(loc2X - loc1X); // deg2rad below
  var dLon = deg2rad(loc2Y - loc1Y);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(loc1X)) *
      Math.cos(deg2rad(loc2X)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = rr * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

//Third comes from the angle between the two
function getAngle() {
  var angleDeg = Math.atan2(loc2Y - loc1Y, loc2X - loc1X) * 180 / Math.PI;
  return angleDeg;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawBackground() {
  //console.log(yminMap);
  //console.log(colH);
  //console.log(colS);
  //console.log(colB);
  background(colH, colS, colB);
}

function touchend(){
  friend_index = (friend_index + 1) % friends.length;
  loc2X = friends[friend_index].x;
  loc2Y = friends[friend_index].y;
  loc1X = me[0].x;
  loc1Y = me[0].y;
}

function mouseClicked() {
  friend_index = (friend_index + 1) % friends.length;
  loc2X = friends[friend_index].x;
  loc2Y = friends[friend_index].y;
  loc1X = me[0].x;
  loc1Y = me[0].y;
}
