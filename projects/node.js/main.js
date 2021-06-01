var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

console.log('Server is running')

var con = mysql.createConnection({
  host: "localhost",
  user: "Username",
  password: "Password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySql is connected");
});