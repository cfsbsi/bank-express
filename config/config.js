import Sequelize from 'sequelize';

export default {
  database: 'bank',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_books.sqlite`,
    define: {
      underscored: true,
    },
    operatorsAliases: Sequelize.Op,
  },
};

