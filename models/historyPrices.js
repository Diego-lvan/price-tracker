"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class historyPrices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.belongsTo(Product, { foreignKey: "productID" });
    }
  }
  historyPrices.init(
    {
      productID: { primaryKey: true, type: DataTypes.STRING, allowNull: false },
      date: { primaryKey: true, type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "HistoryPrices",
      tableName: "historyPrices",
      timestamps: false,
    }
  );
  return historyPrices;
};
