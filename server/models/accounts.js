export default (sequelize, DataType) => {
  const Accounts = sequelize.define('Accounts', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataType.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
      },
    },
  });
  return Accounts;
};
