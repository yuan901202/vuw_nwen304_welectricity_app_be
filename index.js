//Application: welectricity-ninja-hertz
//Author: Tianfu Yuan

var express = require('express');

//added cors
var app = express()
	, cors = require('cors');

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(cors());

//data
//(0) close to hill
//(1) close to river
//(2) close to residential area
//(3) close to valley
//Power as nuclear standard(100), cost as nuclear standard(100), pollute as coal standard(100)

//Source: http://en.wikiversity.org/wiki/Power_Generation-comparison
//http://www.srpnet.com/environment/earthwise/pdfx/spp/March3/6EPRI.pdf

var wind = [
	{power: '15', cost: '63', pollute: '10'},
	{power: '15', cost: '53', pollute: '12'},
	{power: '15', cost: '68', pollute: '12'},
	{power: '15', cost: '58', pollute: '12'}
];

var hydropower = [
	{power: '12', cost: '60', pollute: '3'},
	{power: '12', cost: '50', pollute: '2'},
	{power: '12', cost: '65', pollute: '3'},
	{power: '12', cost: '55', pollute: '3'}
];

var coal = [
	{power: '60', cost: '35', pollute: '100'},
	{power: '60', cost: '26', pollute: '100'},
	{power: '60', cost: '30', pollute: '100'},
	{power: '60', cost: '28', pollute: '100'}
];

var oil = [
	{power: '55', cost: '40', pollute: '87'},
	{power: '55', cost: '31', pollute: '88'},
	{power: '55', cost: '35', pollute: '86'},
	{power: '55', cost: '33', pollute: '88'}
];

var gas = [
	{power: '40', cost: '45', pollute: '51'},
	{power: '40', cost: '36', pollute: '50'},
	{power: '40', cost: '40', pollute: '50'},
	{power: '40', cost: '28', pollute: '51'}
];

var genthermal = [
	{power: '35', cost: '78', pollute: '40'},
	{power: '35', cost: '68', pollute: '41'},
	{power: '35', cost: '97', pollute: '42'},
	{power: '35', cost: '88', pollute: '40'}
];

var unclear = [
	{power: '100', cost: '90', pollute: '16'},
	{power: '100', cost: '90', pollute: '17'},
	{power: '100', cost: '100', pollute: '16'},
	{power: '100', cost: '90', pollute: '17'}
];

var solar = [
	{power: '2', cost: '75', pollute: '42'},
	{power: '2', cost: '65', pollute: '41'},
	{power: '2', cost: '95', pollute: '41'},
	{power: '2', cost: '85', pollute: '40'}
];

var server = app.listen(process.env.PORT, function() {
    console.log('Listening on port %d', server.address().port);
});

//GET wind
app.get('/wind/:id/power', function(req, res) {
  if(wind.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(wind[req.params.id].power);
});

app.get('/wind/:id/cost', function(req, res) {
  if(wind.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(wind[req.params.id].cost);
});

app.get('/wind/:id/pollute', function(req, res) {
  if(wind.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(wind[req.params.id].pollute);
});

//GET hydropower
app.get('/hydropower/:id/power', function(req, res) {
  if(hydropower.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(hydropower[req.params.id].power);
});

app.get('/hydropower/:id/cost', function(req, res) {
  if(hydropower.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(hydropower[req.params.id].cost);
});

app.get('/hydropower/:id/pollute', function(req, res) {
  if(hydropower.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(hydropower[req.params.id].pollute);
});

//GET coal
app.get('/coal/:id/power', function(req, res) {
  if(coal.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(coal[req.params.id].power);
});

app.get('/coal/:id/cost', function(req, res) {
  if(coal.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(coal[req.params.id].cost);
});

app.get('/coal/:id/pollute', function(req, res) {
  if(coal.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(coal[req.params.id].pollute);
});

//GET oil
app.get('/oil/:id/power', function(req, res) {
  if(oil.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(oil[req.params.id].power);
});

app.get('/oil/:id/cost', function(req, res) {
  if(oil.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(oil[req.params.id].cost);
});

app.get('/oil/:id/pollute', function(req, res) {
  if(oil.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(oil[req.params.id].pollute);
});

//GET gas
app.get('/gas/:id/power', function(req, res) {
  if(gas.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(gas[req.params.id].power);
});

app.get('/gas/:id/cost', function(req, res) {
  if(gas.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(gas[req.params.id].cost);
});

app.get('/gas/:id/pollute', function(req, res) {
  if(gas.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(gas[req.params.id].pollute);
});

//GET genthermal
app.get('/genthermal/:id/power', function(req, res) {
  if(genthermal.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(genthermal[req.params.id].power);
});

app.get('/genthermal/:id/cost', function(req, res) {
  if(genthermal.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(genthermal[req.params.id].cost);
});

app.get('/genthermal/:id/pollute', function(req, res) {
  if(genthermal.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(genthermal[req.params.id].pollute);
});

//GET nuclear
app.get('/nuclear/:id/power', function(req, res) {
  if(nuclear.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(nuclear[req.params.id].power);
});

app.get('/nuclear/:id/cost', function(req, res) {
  if(nuclear.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(nuclear[req.params.id].cost);
});

app.get('/nuclear/:id/pollute', function(req, res) {
  if(nuclear.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(nuclear[req.params.id].pollute);
});

//GET solar
app.get('/solar/:id/power', function(req, res) {
  if(solar.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(solar[req.params.id].power);
});

app.get('/solar/:id/cost', function(req, res) {
  if(solar.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(solar[req.params.id].cost);
});

app.get('/solar/:id/pollute', function(req, res) {
  if(solar.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No data found');
  }
  res.send(solar[req.params.id].pollute);
});

