var mongoose = require('mongoose');
var q = require('q');
mongoose.Promise = q.Promise;
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('User', userSchema);

// api

userModel.findUserByUsername = findUserByUsername;
userModel.findUserByFirstName = findUserByFirstName;
userModel.findUserByLastName = findUserByLastName;
userModel.findUserByUserID = findUserByUserID;
userModel.findUserByEmail = findUserByEmail;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.insertUsers = insertUsers;

module.exports = userModel;



// Find user functions
function findUserByUsername(username) {
    return userModel.findOne({'username': username});
}

function findUserByFirstName(firstname) {
    return userModel.findOne({'firstname': firstname});
}

function findUserByLastName(lastname) {
    return userModel.findOne({'lastname': lastname});
}

function findUserByUserID(userid) {
    return userModel.findOne({'userid': userid});
}

function findUserByEmail(email) {
    return userModel.findOne({'email': email});
}

// Add update and delete users
function createUser(user) {
    var d = q.defer();
    userModel.create(user, function (err, user) {
        if(err) {
            var msg = err['errmsg'];
            if (msg.indexOf('duplicate key error') > -1) {
                var duplicate = {
                    'duplicate': true,
                    'field': msg.substring(msg.indexOf('index: ')+7).split('_')[0]
                };
                d.reject(duplicate);
            } else
                d.reject(err);
        }
        else {
            d.resolve(user);
        }
    });
    return d.promise;
}

function updateUser(userId, user) {
    var d = q.defer();
    userModel.findByIdAndUpdate(userId, user, function (err, user) {
        if(err) {
            var msg = err['errmsg'];
            if (msg.indexOf('duplicate key error') > -1) {
                var duplicate = {
                    'duplicate': true,
                    'field': msg.substring(msg.indexOf('index: ')+7).split('_')[0]
                };
                d.reject(duplicate);
            } else
                d.reject(err);
        }
        else {
            d.resolve(user);
        }
    });
    return d.promise;
}

function deleteUser(userId) {
    var d = q.defer();
    userModel.findByIdAndRemove(userId, function (err, user) {
        if(err)
            d.reject(err);
        else {
            user.remove();
            d.resolve(user);
        }
    });
    return d.promise;
}

function insertUsers(users) {
    return userModel.insertMany(users);
}