
document.getElementById('register').addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let picture = document.getElementById('picture').value;


const connection = require ('./db.js');


connection.query('INSERT INTO Users ' +
    '(username, email, password, picture) VALUES ()', (err, result) => {
        if (err) throw err;
        console.log('Inserted ' + result.affectedRows + ' row(s).');
    
    connection.end();
    });

});

