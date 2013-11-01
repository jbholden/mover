var Sequelize = require('sequelize');

var fs = require('fs');
var sqlLogFile = fs.createWriteStream(__dirname + "/../public/logs/sql.log", {flags:'a'});

function log_sql(text) {
   var d = new Date();
   var logstr = d.toUTCString() + ": *********************\n" + text + "\n\n";
   sqlLogFile.write(new Buffer(logstr));
}

var sequelize = new Sequelize('moverdb','postgres', 'nodejs', {
	   host: '127.0.0.1',
	   port: 5432,
	   dialect: 'postgres',
      logging: log_sql
});

var models = [
  'users'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports.sequelize = sequelize;

