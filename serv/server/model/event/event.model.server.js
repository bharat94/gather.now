var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = q.Promise;
var eventSchema = require('./event.schema.server');
var eventModel = mongoose.model('Event', eventSchema);

eventModel.findEventById = findEventById;
eventModel.findEventsByOrganizer = findEventsByOrganizer;
eventModel.createEvent = createEvent;

module.exports = eventModel;

function findEventById(eventId) {
	return eventModel.findById(eventId);
}

function findEventsByOrganizer(userId) {
	return eventModel.find({'organizer': userId});
}

function createEvent(event) {
	return eventModel.create(event);
}