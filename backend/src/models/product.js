"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserProducts, HistoryPrices, Domain }) {
      // define association here
      this.hasMany(UserProducts, { foreignKey: "productID" });
      this.hasMany(HistoryPrices, { foreignKey: "productID" });
      this.belongsTo(Domain, { foreignKey: "idDomain" });
    }
  }
  Products.init(
    {
      productID: { type: DataTypes.STRING, primaryKey: true },
      idDomain: { type: DataTypes.INTEGER, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "product",
    }
  );
  return Products;
};
