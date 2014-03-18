"use strict";

var fs = require("fs");
var _ = require("underscore")._;

module.exports.Config = function (locations) {
    var this_ = this;
    _(locations).each(function (location) {
        try {
            var properties = JSON.parse(fs.readFileSync(location));
            _(properties).each(function (value, key) {
                this_[key] = value;
            });
        } catch (error) {
            console.log("Failed to load config at: " + location + " because of: " + error.message);
        }
    });

    _(process.env).each(function(value, key) {
      this_[key] = value;
    })
};
