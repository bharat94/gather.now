var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = q.Promise;
var attendeeSchema = require('./attendee.schema.server');
var attendeeModel = mongoose.model('Attendee', attendeeSchema);

attendeeModel.findAttendeesByEvent = findAttendeesByEvent;
attendeeModel.findAttendeesByOrganizer = findAttendeesByOrganizer;

module.exports = attendeeModel;

function findAttendeesByEvent(eventId) {
	return attendeeModel.find({'event': eventId});
}

function findAttendeesByOrganizer(userId) {
	return attendeeModel.find({'organizer': userId});
}