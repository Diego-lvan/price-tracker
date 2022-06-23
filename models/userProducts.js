"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      // define association here
      this.belongsTo(User, { foreignKey: "email" });
      this.belongsTo(Product, { foreignKey: "productID" });
    }
  }
  userProducts.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      productID: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    },
    {
      sequelize,
      modelName: "UserProducts",
      tableName: "userProducts",
    }
  );
  return userProducts;
};
