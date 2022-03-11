// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// solution
app.get('/api/:input?', (req, res, next) => {
  const input = req.params.input;
  if (!input) {
    req.unix = Date.now();
  } else if (/^\d+$/.test(input)) {
    req.unix = +input;
  } else {
    req.unix = Date.parse(input);
    if (Number.isNaN(req.unix)) {
      res.json({ error : 'Invalid Date' });
    }
  }
  req.utc = new Date(req.unix).toUTCString();
  next();
}, ({ unix, utc }, res) => {
  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
