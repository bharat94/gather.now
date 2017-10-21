module.exports = function(app)
{
    app.get("/api/test", printHello);

    function printHello(){
        console.log('Hello')
    }

};