var types = ['CONVENE', 'PARTY'];
var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
	organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	eventType: { type: String, enum: types }
	location: { type: String },
	dateCreated: { type: Date, default: Date.now() }
}, {collection: 'event'});