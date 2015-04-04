"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "ble", uuid: "your_uuid" }
  },

  devices: {
    apls: { driver: "alps-multi-sensor" }
  },

  work: function(my) {
    my.apls.getData(function(err, data) {
      console.log("data:", data);
    });            
  }
}).start();
