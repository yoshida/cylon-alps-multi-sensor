"use strict";

var wiced = source("cylon-alps-multi-sensor");

var WICEDSense = source("driver");

describe("Cylon.AplsMultiSensor", function() {
  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(wiced.drivers).to.be.eql(["alps-multi-sensor"]);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the AplsMultiSensor", function() {
      var args = { adaptor: {} };
      expect(wiced.driver(args)).to.be.instanceOf(AplsMultiSensor);
    });
  });
});
