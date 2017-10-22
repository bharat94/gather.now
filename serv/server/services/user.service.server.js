/**
 * Created by rohansapre on 3/22/17.
 */
module.exports = function (app, model) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.delete("/api/user/:userId", deleteUser);
    /*app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/loggedin", loggedin);*/

    function createUser(req, res) {
        console.log('createUser called');
        var newUser = req.body;
        console.log('newUser : '+newUser);
        console.log('newUser.email : '+newUser.email);
        console.log('newUser.userid : '+newUser.userid);
        console.log('newUser.username : '+newUser.username);
        model.user
            .findUserByEmail(newUser.email)
            .then(function (user) {
                console.log('user : '+user);
                if (user) {
                    model.user
                        .updateUser(user._id, newUser)
                        .then(function (tempUser) {
                            res.json(tempUser);
                        }, function (error) {
                            if (error.duplicate) {
                                res.statusMessage = JSON.stringify(error);
                                res.status(505).end();
                            } else
                                res.sendStatus(506).send(error);
                        })
                } else {
                    model.user
                    .createUser(newUser)
                        .then(function (tempUser) {
                            res.json(tempUser);
                        }, function (error) {
                            if (error.duplicate) {
                                res.statusMessage = JSON.stringify(error);
                                res.status(501).end();
                            } else
                                res.sendStatus(502).send(error);
                        });
                }
            }, function (error) {
                console.log("error");
                console.log(error);
                res.sendStatus(504).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model.user
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
    }

    function findUserByUsername(req, res) {
        console.log('findUserByUsername called');
        var username = req.query.username;
        model.user
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model.user
            .updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
    }

    function deleteUser(req, res) {
        console.log('delete called');
        var userId = req.params.userId;
        console.log('userid : '+userId);
        model.user
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.user
            .findUserById(user._id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            })
    }
};