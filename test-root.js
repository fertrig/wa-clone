global.assert = require("chai").assert;

global.testUtils = {
	stringLength: function(len) {
		return Array(++len).join('a');
	}
};