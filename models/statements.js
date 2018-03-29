export default (sequelize, DataType) => {
    const Statements = sequelize.define('Statements', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transferValue: {
            type: DataType.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    });
    return Statements;
}