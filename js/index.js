//task list for code
// -fix the delay that is brought in with the ifmouseClicked function yminMap variables are used for the next person
//- get your own location from the getGeolocation thing

//location variables these should in the end come directly from your phone/computer
var me = [{ name: "maud", x: 11.316899, y: 50.979899 }];

var friends = [ 
  { name: "rachel", x: 11.332045, y: 50.971160 },
  { name: "christoph", x: 11.315262, y: 50.974162 },
  { name: "pablo", x: 11.32758, y: 50.973784 },
  { name: "marta", x: 11.33009, y: 50.984816 },
  { name: "alineWeimar", x: 11.316899, y: 50.979897 },
  { name: "hauptbahnhof", x: 11.32771, y: 50.991164 },
  { name: "belvedere", x: 11.339248, y: 50.965595 },
  { name: "yulia", x: 11.306187, y: 50.980236 },
  { name: "lucy", x: 12.327041, y: 51.327045 },
  { name: "andreas", x: 9.484276, y: 51.312328 },
  { name: "adrian", x: 13.44589, y: 52.442823 },
  { name: "franzi", x: 8.79036, y: 53.085036 },
  { name: "viola", x: 11.566735, y: 48.141888 },
  { name: "konse", x: 13.760927, y: 51.05613 },
  { name: "yael", x: 8.219497, y: 49.14952 },
  { name: "parents", x: 4.949638, y: 52.343978 },
  { name: "brother", x: 4.457034, y: 51.930167 },
  { name: "dieuwertje", x: -4.24847, y: 55.856054 },
  { name: "fennaGent", x: 3.692499, y: 51.060821 },
  { name: "edo", x: 11.264115, y: 43.767498 },
  { name: "gulsah", x: 29.020392, y: 41.05499 },
  { name: "anja", x: 13.009123, y: 55.607879 },
  { name: "fennaAzoia", x: -9.18201, y: 38.428754 },
  { name: "penelope", x: -78.876708, y: 42.863777 },
  { name: "claire", x: -118.384310, y: 34.003106 },
  { name: "esther", x: -13.254891, y: 8.47137 },
  { name: "jorge", x: -90.506725, y: 14.626069 },
  { name: "alineSaoPaulo", x: -46.635193, y: -23.565544 },
  { name: "grace", x: 123.903971, y: 10.299135 },
  { name: "queenMaudLand", x: -149.070936, y: -79.519699 },
    { name: "endOftheWorld", x: -176.618274, y: 0.811322 }, 
  { name: "earthsOrigin", x: 0.0, y: 0.0 }
];

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
  me.x = pos.coords.longitude;
  me.y = pos.coords.latitude;
}

function nav_error(error)
{
  switch(error.code)
  {
      case error.PERMISSION_DENIED:
          x.innerHTML = "You denied access"
          break;
      case error.POSITION_UNAVAILABLE:
          x.innerHTML = "The position is unfortunately not available at this time"
          break;
      case error.TIMEOUT:
          x.innerHTML = "Taking too long"
          break;
      case error.UNKNOWN_ERROR:
          x.innerHTML = "Huh?!"
          break;
  }
}

function draw() {
  //loc2X = friends[friend_index].x;
  //loc2Y = friends[friend_index].y;
  loc1X = me[0].x;
  loc1Y = me[0].y;

  for (var i=0; i<places.length; i++) {
    loc2X = friends[friend_index].x;
    loc2Y = friends[friend_index].y;

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
    maxDist = places[place_index].maxDist;
  }
  }

  colorMode(HSB);

  middlepoint = getCendroid();
  colH = map(middlepoint, xminMap, ymaxMap, 0, 360);
  distan = getDistance();
  colS = map(distan, 0, maxDist, 0, 100);
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
