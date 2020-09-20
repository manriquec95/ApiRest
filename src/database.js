const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'db4free.net',
  user: 'desaweb2020',
  password: 'desaweb2020',
  database: 'umg4desaweb',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;