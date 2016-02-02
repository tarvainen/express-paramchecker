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

Fill up your `server.js` with the content below. Note thas this is the minimalistic usage of paramchecker with Express.js.

    var express = require('express');
    var app = express();
    var bodyparser = require('body-parser');
    var paramchecker = require('express-paramchecker');
    
    app.use(bodyparser.json());
    
    app.post('/feedback', paramchecker.check('name', 'email', 'content'), function (req, res, next) {
    	res.status(200).send({
    		msg: 'Yah!',
    		success: true
    	});
    });
    
    app.listen(5000);
    

## Customization
As default the express-paramchecker will go on if all the parameters were included in the request. If some of the parameters is missing, will the express-paramchecker send an error message as response.
There is a way to customize the message sent on error and you can do it with the ParamChecker.setup() function.

    paramchecker.setup({
      path: 'body', // where to look at the parameters (body with the body-parser)
      status: 400, // the response http status
      error: { // just the message to sent as response
        msg: 'This is a custom error.',
        success: false
      }
    });
