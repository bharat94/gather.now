module.exports = function (app) {
	var connectionString = 'mongodb://127.0.0.1:27017/gathernow';

	var mongoose = require("mongoose");
	mongoose.connect(connectionString);
};