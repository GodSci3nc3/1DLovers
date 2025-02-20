import express from 'express';
import cors from 'cors';
import multer from 'multer';
import connection from './db.js';

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/register', upload.single('picture'), (req, res) => {
    console.log('Datos recibidos en /register:', req.body);


    const { username, email, password } = req.body;
    const picture = req.file ? req.file.filename : null; 

    connection.query(
        `INSERT INTO Users (name, email, password, picture) VALUES (?, ?, ?, ?)`,
        [username, email, password, picture],
        (err, result) => {
            if (err) {
                console.error('Error al insertar:', err);
                return res.status(500).json({ error: 'Error en la base de datos' });
            }
            console.log('Inserted ' + result.affectedRows + ' row(s).');
            res.json({ message: 'Registro exitoso' });
        }
    );
});

app.post('/login', (req, res) => {
    console.log('Datos recibidos en /login:', req.body);

    const { username, password } = req.body;
    
    connection.query ('SELECT name, email FROM Users WHERE name = ? AND password = ?', [username, password], (err, rows) => {
        if (err) {
            console.error('Error al consultar:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        if (rows.length > 0) return res.status(200).json({ error: 'Usuario o contraseña correctos' });
        res.json(rows[0]);
    });
});

app.listen(3000, () =>  {
    console.log('Server running on 3000');
});