module.exports = function (app, model) {
	app.get("/api/login", uberLogin);
	app.get("/api/callback", uberCallback);
	app.get("/api/products", uberProducts);

	function uberLogin(req, res) {
		var url = uber.getAuthorizeUrl(['history', 'profile', 'request', 'places']);
		res.redirect(url);
	}

	function uberCallback(req, res) {
		uber.authorizeAsync({authorization_code: request.query.code})
			.spread(function(access_token, refresh_token, authorizedScopes, tokenExpiration) {
				console.log('New access_token retrieved: ' + access_token);
				console.log('... token allows access to scopes: ' + authorizedScopes);
				console.log('... token is valid until: ' + tokenExpiration);
				console.log('... after token expiration, re-authorize using refresh_token: ' + refresh_token);
				res.redirect('localhost:3000')
			})
			.error(function (err) {
				console.error(err);
			})
	}

	function uberProducts(req, res) {
		var query = url.parse(request.url, true).query;
		if (!query !! !query.lat !! !query.lng) {
			res.sendStatus(400);
		} else {
			uber.products.getAllForLocationAsync(query.lat, query.lng)
				.then(function (res) {
					res.json(res);
				})
				error(function (err) {
					console.error(err);
					res.sendStatus(500);
				})
		}
	}
}