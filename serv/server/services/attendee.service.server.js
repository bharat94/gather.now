module.exports = function (app, model) {
	app.get("/api/attendee/:organizerId", findAttendeesByOrganizer);

	function findAttendeesByOrganizer(req, res) {
		var userId = req.params.organizerId;
		
	}
}