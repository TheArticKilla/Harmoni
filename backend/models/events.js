"use strict";
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    "Events",
    {
      event_name: DataTypes.STRING,
      location: DataTypes.STRING,
      event_start: DataTypes.DATE,
      event_end: DataTypes.DATE,
      personnel: DataTypes.TEXT,
      description: DataTypes.TEXT,
      archived: DataTypes.BOOLEAN
    },
    {}
  );
  Events.associate = function(models) {
    Events.belongsToMany(models.Users, {
      as: "user_contract",
      through: "Contracts",
      foreignKey: "eventID",
      otherKey: "userID"
    });
    Events.belongsToMany(models.Users, {
      as: "user_riders",
      through: "Riders",
      foreignKey: "eventID",
      otherKey: "userID",
      otherKey: "rider_typeID"
    });
    Events.belongsToMany(models.Rider_Types, {
      as: "rider_types",
      through: "Riders",
      foreignKey: "eventID",
      otherKey: "userID",
      otherKey: "rider_typeID"
    });
    Events.hasMany(models.Tickets, { foreignKey: "eventID", sourceKey: "id" });
  };
  return Events;
};
