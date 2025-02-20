
import mysql from 'mysql2';

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

connection.query('SELECT user_id, name, email, picture FROM Users', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:');
    console.log(rows);
}
);

export default connection;