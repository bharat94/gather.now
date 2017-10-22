var mongoose = require('mongoose');
var attendeeSchema = mongoose.Schema({
	organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
	attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	attending: { type: boolean, default: false },
	dateCreated: { type: Date, default: Date.now() }
}, {collection: 'attendee'});