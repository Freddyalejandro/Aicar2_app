var express = require('express');
var session = require('express-session');
var mysql = require('mysql2');
var cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Para generar tokens JWT

// Crear la aplicación express
const app = express();
const port = 8082;

// Usar CORS y JSON en las solicitudes
app.use(cors());
app.use(express.json());

// Crear el pool de conexiones MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'aicar',
    password: 'qwertyuiop',
    database: 'aicar',
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones
    queueLimit: 0
});

// Verificar si la conexión se establece correctamente al iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.release(); // Liberar la conexión después de la comprobación
});

// Definir las rutas de la API
app.get('/api/datos', (req, res) => {
    pool.query('SELECT * FROM user', (err, result) => {
        if (err) {
            console.error('Error in query:', err);
            res.status(500).send('Error querying the database');
            return;
        }
        res.json(result);
    });
});

// Asegúrate de tener configurada la base de datos y el pool de conexiones

// Ruta para crear un nuevo usuario
app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ success: false, message: 'Error processing password.' });
      }

      const query = 'INSERT INTO user (first_name, last_name, email, hashedPassword) VALUES (?, ?, ?, ?)';
      pool.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
          if (err) {
              console.error('Error inserting user:', err);
              return res.status(500).json({ success: false, message: 'Error creating user.' });
          }

          res.status(200).json({ success: true, message: 'User created successfully!' });
      });
  });
});



  app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    pool.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ error: 'Server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generar el token solo si la contraseña es correcta
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'secretKey', // Reemplázalo por una clave segura en producción
                { expiresIn: '1h' }
            );
            console.log("Successful login for:", user.first_name);
            console.log(user.hashedPassword, "the hashed password does not match");
            res.status(200).json({ success: true, message: 'login successfully!', token });
        });
    });
});


  
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Node app listening on port ${port}!`);
});
