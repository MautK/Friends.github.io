//console.log("nodeJS is working");

//with this you can load files from your own memory
var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");

//create http server
http.createServer(function (request, response){
//it joins the url to the pathname (whats behind the /...)
var relative_path = url.parse(request.url).pathname;
var absolute_path = path.join(process.cwd(), relative_path);
console.log(request.url);

//check if path exists (because we cannot send anything if the path doesnt exist)
fs.exists(absolute_path, function(path_exists){
  if(path_exists){

//if path exists we try to read the file
fs.readFile(absolute_path, "binary", function(error, file) {
  if(error) //if error has occured
  {
    response.writeHeader(500, {"Content-Type":"text/plain"});
    response.write("Oh no 500 NOT FOUND\n");
    response.end();
  } else //if no error has occured you need to send the file
  {
    response.writeHeader(200);
    response.write(file, "binary");
    response.end();
  }
});
    //path does not exist
  } else {
    //the 404 in this line means that the file doesn't exist
    response.writeHeader(404, {"Content-Type":"text/plain"});
    response.write("Oh no 404 NOT FOUND\n");
    response.end();
  }
});
}).listen(8080);
