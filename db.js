const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    // {dialect: 'postgres', storage: 'continual-loop-413614:us-central1:root'}
    'test_bot',
    'root',
    '',
    {
        host: '127.0.0.1',
        port: '5432',
        dialect: 'postgres'
    }
);