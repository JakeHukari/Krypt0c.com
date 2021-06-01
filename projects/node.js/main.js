var http = require('http');
var fs = require('fs');
var rs = fs.createReadStream('./testfile.txt');

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

console.log('Server is running')

fs.appendFile('testfile.txt', 'Test', function (err) {
  if (err) throw err;
  console.log('File is saved');
});
