module.exports = function(app)
{
    app.get("/api/test", printHello);

    function printHello(){
        console.log('Hello')
    }


    var userModel = require('./model/user/user.model.server');
    var model = {
        user: userModel
    };

    console.log('before api service');
    require('./services/api.service.js')(app);

    require('./services/user.service.server.js')(app, model);

};