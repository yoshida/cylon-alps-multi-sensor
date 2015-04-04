/*
 * cylon-ble AplsMultiSensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var AplsMultiSensorService = "56396415-E301-A7B4-DC48-CED976D324E9",
    AplsMultiSensorCharacteristic = "38704154-9A8C-8F8F-4449-89C0AF8A0402",

var AplsMultiSensor = module.exports = function AplsMultiSensor(opts) {
  AplsMultiSensor.__super__.constructor.apply(this, arguments);

  this.serviceId = opts.serviceId || AplsMultiSensorService;

  this.commands = {
    getData: this.getData
  };
};

Cylon.Utils.subclass(AplsMultiSensor, Cylon.Driver);

/**
 * Starts the driver
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
AplsMultiSensor.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
AplsMultiSensor.prototype.halt = function(callback) {
  callback();
};

/**
 * Gets data from the AplsMultiSensor Sense device.
 *
 * This includes the following sensor data:
 *
 * - temperature
 * - pressure
 * - magnetometer
 * - humidity
 * - gyroscope
 * - accelerometer
 *
 * @param {Function} callback to be triggered when data is retrieved
 * @return {null}
 * @publish
 */
AplsMultiSensor.prototype.getData = function(callback) {
  this.connection.notifyServiceCharacteristic(
    this.serviceId,
    AplsMultiSensorCharacteristic,
    true,
    function(err, data) {
      if (data !== null) {
        data = this._parseData(data);
      }

      callback(err, data);
    }.bind(this)
  );
};

AplsMultiSensor.prototype._parseData = function(data) {
  var header1 = data[0],
      header2 = data[1],
      result = {},
      x, y, z;

  if (header1 == 0x14) {
    x = data.readInt16LE(2); /* -16000 ~ 16000 */
    y = data.readInt16LE(4); /* -16000 ~ 16000 */
    z = data.readInt16LE(6); /* -16000 ~ 16000 */
    result["magnetometer"] = {x: x, y: y, z: z};
      
    x = data.readInt16LE(8);  /* -8192 ~ 8191 */
    y = data.readInt16LE(10); /* -8192 ~ 8191 */
    z = data.readInt16LE(12); /* -8192 ~ 8191 */
    result["accelerometer"] = {x: x, y: y, z: z};
      
    var pressure = data.readInt16LE(14); /* 3810 ~ 64773 */
    result["pressure"] = pressure;

    if (header2 == 0xb0) {
      var uv = data.readInt16LE(16); /* 0 ~ 4095 */
      var lx = data.readInt16LE(18); /* 0 ~ 4095 */
        
      result["uv"] = uv;
      result["lx"] = lx;
    }

    if (header2 == 0xb1) {
      var humidity = data.readInt16LE(16);    /* 896 ~ 7296 */
      var temperature = data.readInt16LE(18); /* 96 ~ 6346 */

      result["humidity"] = humidity;
      result["temperature"] = temperature;
    }

  } // if (header1 == 0x14)
  
  return result;
};

AplsMultiSensor.prototype._getServiceCharacteristic = function(id, callback) {
  this.connection.readServiceCharacteristic(this.serviceId, id, callback);
};
