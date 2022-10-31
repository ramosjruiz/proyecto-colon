const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const PORT = 8080;
// Importar rutas
const authRoute = require('./routes/auth');
const playsRoute = require('./routes/plays');

// Middleware
// Parse JSON bodies
app.use(express.json());
// Make API calls from outside domain
app.use(cors());
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/plays', playsRoute);

// Conectar a DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err) => {
    if (err) {
    console.log(err);
    } else {
    console.log('mongodb is connected');
    }});

// Empezar a escuchar al servidor
app.listen(
    PORT,
    () => console.log(`esta vivo en http://localhost:${PORT}`)
);
