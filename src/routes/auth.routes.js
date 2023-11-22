import express from 'express';
import User from '../dao/models/userModel.js'
import path from 'path';
import url from 'url';
import { __dirname, __filename } from '../utilities.js';

const routesAuth = express.Router();

routesAuth.get('/register', async (req, res) => {
    const registerPath = path.join(__dirname, '../', 'public', 'register.html');
    res.sendFile(registerPath);
});

routesAuth.post('/register', async (req, res) => {
    try {
    const { nombre, apellido, edad, email, passwordRegistro } = req.body;
    console.log(req.body);
    if (!nombre || !apellido || !edad || !email || !passwordRegistro) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const user = new User({
        nombre,
        apellido,
        edad,
        email,
        password: passwordRegistro
    });

    await user.save();
    res.redirect('/login');
    } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar');
    }
});

routesAuth.get('/login', (req, res) => {
    const loginPath = path.join(__dirname, '../', 'public', 'login.html');
    res.sendFile(loginPath);
});

routesAuth.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.userId = user._id;
            res.redirect('/');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        res.status(500).send('Error al iniciar sesión');
    }
});

routesAuth.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


/*PARA MARQUITOS PARA NO LO HICE TODAVIA*/

export default routesAuth;