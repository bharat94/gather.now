module.exports = function()
{
	/*var Uber = require('node-uber');

	var uber = new Uber({
	  client_id: 'l1gmADxBqabpXA8Hu3aHE0ovocyyKTRn',
	  client_secret: 'Raoi8cGWuDcWI_k7mant8glXlqSwkhSTTu2H3cgq',
	  server_token: 'IGDeQEbGP1raujyQ_xG2BFajk9raCQrqLka3Iabh',
	  redirect_uri: 'http://www.google.com',
	  name: 'gather.now',
	  //language: 'en_US', // optional, defaults to en_US
	  sandbox: true // optional, defaults to false
	  //proxy: 'PROXY URL' // optional, defaults to none
	});


	app.get('/api/login', function(request, response) {
	  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
	  response.redirect(url);
	});*/


	// yelp api

	var request = require('request');


	request.post({
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    url : 'https://api.yelp.com/oauth2/token',
	    form : { grant_type: 'client_credentials', client_id: 'kow19C38NT3KhPSbfD6qog', client_secret: 'ug1lSda7cKh4l0JHqwRqR9ndePyoiNabVjn6assrPUPIEZD0dPffXlm0tGMTrNKP' }
		},

	    function (error, response, body) {
	        if (!error && response.statusCode == 200) {
	            console.log(body);

	            var access_token = body.access_token;

	            request.get({
	            		headers: {'Authorization': access_token},
	    				url : 'https://api.yelp.com/v3/businesses/search?latitude='+37.7670169511878+'&longitude=-'+122.42184275+'&limit=50'
	    				},
	    				function (error, reponse, body) {
	    					console.log('response : '+Object.keys(response));
	    					console.log('body : '+body);
	    				}
            	);
				}
			}
         );

};