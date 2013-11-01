exports.get = function(req, res){
    res.render('login', { error:null });
}; 

exports.post = function(req, res){
    var users_model = res.locals.models.users;

    var username = req.body['username'];
    var password = req.body['password'];

    var async = require('async');

    async.auto({
        find_user: function(next) {
            users_model.find({where:{name:username}}).complete(next);
    }}, function(err, results) {
        if (results.find_user == null) {
            res.render('login', { error:'(Invalid Login)' });
            return
        }
        res.redirect('/');   
    });
}; 
