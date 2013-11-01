module.exports = function(sequelize, DataTypes) {
   return sequelize.define('users', {
      id: DataTypes.INTEGER,    
      name: DataTypes.STRING,    
      password: DataTypes.STRING
  }, {
    timestamps: false
  });
};
