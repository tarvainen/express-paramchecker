# DEPRECATED

Development of this library has been ended decades ago. Please don't use this anymore. Pull requests and issues will be just ignored because I simply have no time for this. 

Package from the npm will not be removed.

# express-paramchecker
The request parameter checker to be used with Express.js

## Installation
Install the latest version of express-paramchecker using npm just typing `npm install express-paramchecker` into your terminal. Use `--save` directive to save the dependency to your `package.json` automatically.

## Usage
The basic usage of express-paramchecker is pretty simple. It is used as a Express.js middleware within the route clarification. See the full example below.

Firstly create your package.json file with all the dependencies needed.

    {
      "name": "Test",
      "version": "0.0.0",
      "description": "Test",
      "main": "server.js",
      "dependencies": {
        "body-parser": "^1.14.2",
        "express": "4.13.3",
        "express-paramchecker": "1.0.0"
      }
    }
    
Then run `npm install` in your project root. Npm will now install all the dependencies clarified in the package.json.

Fill up your `server.js` with the content below. Note that this is the minimalistic usage of paramchecker with Express.js.

    var express = require('express');
    var app = express();
    var bodyparser = require('body-parser');
    var paramchecker = require('express-paramchecker');
    
    paramchecker.on('error', function (req, res, next) {
        res.status(400).send({
            msg: 'Parameters missing!',
            success: false
        });    
    });
    
    paramchecker.on('success', function (req, res, next) {
        next();    
    });
    
    app.use(bodyparser.json());
    
    app.post('/feedback', paramchecker.check(['name', 'email', 'content']), function (req, res, next) {
    	res.status(200).send({
    		msg: 'Yah!',
    		success: true
    	});
    });
    
    app.listen(5000);
    
## Options
You can pass few options to ParamChecker.check(). One of those one options is the replace function. There you can declare  if you want to add or remove or replace something to all input values. Hope the example below clears it out a little.

    /* Just replaces all the 'cat' values in the input with 'dog'. */
    var replaceFunc = function (data) {
        return data.replace('cat', 'dog');
    }
    
    var opts = {
        replace: replaceFunc
    };
    
    app.post('/feedback', paramchecker.check(['name', 'email', 'content'], opts), function (req, res, next) {
    	res.status(200).send({
    		msg: 'Yah!',
    		success: true
    	});
    });
