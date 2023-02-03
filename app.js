const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

//create express instance
const app = express();

// CORS is a Node.js package used for handling Cross-Origin Resource Sharing (CORS) issues
// in web applications. It provides a middleware that enables a server to support CORS by
//adding HTTP headers to response objects. This allows a server to specify which origins are
//allowed to access its resources, helping to protect against cross-site attacks.
app.use(cors());

// This line of code sets up a catch-all middleware for HTTP OPTIONS requests that allows CORS
//for all endpoints in the Express.js application. The "*" argument specifies that this middleware
// will handle HTTP OPTIONS requests for all endpoints.
app.options("*", cors());

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// reading data from the request body into req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//parses the cookies that are sent in the HTTP request
//and makes them available as an object in the req.cookies property
app.use(cookieParser());

//prevent MongoDB injection attacks by removing special characters that
// could be used to inject malicious operations into a MongoDB query.
app.use(mongoSanitize());

//prevent cross-site scripting (XSS) attacks by sanitizing user input to
// remove potentially malicious code.
app.use(xss());

//ROUTES  (Must come last as they are usually dependent on middlewares and other configurations that are set up earlier in the file.)

module.exports = app;
