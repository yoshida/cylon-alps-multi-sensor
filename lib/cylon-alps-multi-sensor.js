/*
 * alps-multi-sensor
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Your Name Here
 * Your License Here
*/

"use strict";

var Driver = require("./driver");

module.exports = {
  drivers: ["alps-multi-sensor"],

  driver: function(opts) {
    return new Driver(opts);
  }
};
