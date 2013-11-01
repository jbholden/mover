function bad_username_format(username) {
    var r = new RegExp("^[a-zA-Z0-9_-]{3,20}$");
    return r.test(username) == false; 
}

function bad_password_format(password) {
    var r = new RegExp("^.{3,20}$")
    return r.test(password) == false; 
}

function passwords_dont_match(password1,password2) {
    return password1 != password2;
}

function username_already_exists(users_model,username) {
    return false;

    var async = require('async');

    async.auto({
        find_user: function(next) {
            users_model.find({where:{name:username}}).complete(next);
    }}, function(err, results) {
        var user_already_exists = results.find_user != null;
        yield user_already_exists;
    });
}


module.exports = {
    bad_username_format:bad_username_format,
    bad_password_format:bad_password_format,
    passwords_dont_match:passwords_dont_match,
    username_already_exists:username_already_exists
}
