exports.get = function(req, res){
    res.render('signup', { error:null });
}; 

exports.post = function(req, res){
    var users_model = res.locals.models.users;
    var lib = require('../src/signup_code');

    var username = req.body['username'];
    var password = req.body['password'];
    var verify = req.body['verify'];

    var data = { user_name:null, user_error:null, password_error:null };

    if (lib.bad_username_format(username)) {
        data['user_name'] = null;
        data['user_error'] = "Bad Format: 3-20 characters (letters, numbers, _, or -)";
    } else if (lib.bad_password_format(password)) {
        data['user_name'] = username;
        data['password_error'] = "Bad Format: 3-20 characters";
    } else if (lib.passwords_dont_match(password,verify)) {
        data['user_name'] = username;
        data['password_error'] = "Passwords don't match";
    } else if (lib.username_already_exists(username)) {
        data['user_name'] = null;
        data['user_error'] = "Username already exists"
    }

    //check_for_multiple_username(username,add_new_user,found_multiple_users);


    res.render('signup', data);
    return
}; 

