"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Domains extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.hasMany(Product, { foreignKey: "idDomain" });
    }
  }
  Domains.init(
    {
      domainID: { type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Domain",
      tableName: "domain",
      timestamps: false,
    }
  );
  return Domains;
};
