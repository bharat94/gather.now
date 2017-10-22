module.exports = function(app)
{
    var connectionString = 'mongodb://127.0.0.1:27017/gathernow';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var Uber = require('node-uber');
    var uber = new Uber({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        server_token: process.env.SERVER_TOKEN,
        redirect_uri: process.env.REDIRECT_URL,
        name: 'Gather.Now',
        language: 'en_US',
        sandbox: true
    })
};