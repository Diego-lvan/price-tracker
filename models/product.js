"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "email" });
    }
  }
  Products.init(
    {
      productID: { type: DataTypes.STRING, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "product",
    }
  );
  return Products;
};
