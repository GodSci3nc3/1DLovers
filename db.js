const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '1DLovers'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
}
);

connection.query('SELECT * FROM Users', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
}
);

module.exports = connection;