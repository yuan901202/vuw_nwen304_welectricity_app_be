
# welectricity-ninja-hertz

A barebones Node.js app using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Server address: https://welectricity-ninja-hertz.herokuapp.com/

Use nodeJS and expressJS on index.js

## Clone code from Heroku

Clone code to your local from Heroku:
$heroku git:clone -a welectricity-ninja-hertz

## Inportant Notes

Format to get response: https://welectricity-ninja-hertz.herokuapp.com/[power_source]/[place_id]/[info]

Example: https://welectricity-ninja-hertz.herokuapp.com/hydropower/0/power


Details: 
[power_source]: oil, gas, coal, unclear, hydropower, genthermal

[place_id] (when u place the power source at different place, the data associated with place was different, like hill, close river, residential area， etc): 0, 1, 2, 3, ...

[info]: cost, power, pollute

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
