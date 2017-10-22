module.exports = function (app, model) {
	app.post("/api/event", createEvent);
	app.get("/api/event/:eventId", findEventById);
	app.get("/api/event/org/:userId", findEventsByOrganizer);

	function createEvent(req, res) {
		var event = req.body;
		model.event.createEvent(event)
			.then(function (event) {
				res.json(event);
			}, function (error) {
				console.log(error);
				res.sendStatus(500).send(error);s
			});
	}

	function findEventById(req, res) {
		var eventId = req.params.eventId;
		model.event
			.findEventById(eventId)
			.then(function (event) {
				res.json(event);
			}, function (error) {
				res.sendStatus(500).send(error);
			})
	}

	function findEventsByOrganizer(req, res) {
		var userId = req.params.userId;
		model.event
			.findEventsByOrganizer(userId)
			.then(function (events) {
				res.json(events);
			}, function (error) {
				res.sendStatus(500).send(error);
			})
	}
}