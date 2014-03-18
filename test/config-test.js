var Config = require("../config").Config;
var assert = require("assert");
var path = require("path");

var sample1 = path.resolve(process.cwd(), './test/data/sample1.json');
var sample2 = path.resolve(process.cwd(), './test/data/sample2.json');

describe('Config Object', function() {
  describe('Constructor', function() {
      it("should load a JSON config object from the file system", function() {
        var config = new Config([sample1]);

        assert.equal('ValueA', config["keyA"]);
        assert.equal('ValueB', config["keyB"]);
      }),
      it("should override the base properties when given a second location", function() {
        var config = new Config([sample1, sample2]);

        assert.equal('OverriddenA', config["keyA"]);
        assert.equal('OverriddenB', config["keyB"]);
      }),
      it("should override any config with env vars", function() {
        process.env.keyA = "bannanas";
        var config = new Config([sample1, sample2]);

        assert.equal('bannanas', config["keyA"]);
        assert.equal('OverriddenB', config["keyB"]);
      })
  })
})
