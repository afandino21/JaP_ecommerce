import jwt from 'jsonwebtoken';
import path from 'path';
import { readFile } from 'fs/promises';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Acceso no autorizado. Token no proporcionado.');
    }
    jwt.verify(token, 'secreto-seguro', (err, user) => {
        if (err) {
            return res.status(403).send('Acceso no autorizado. Token inválido.');
        }
        req.user = user;
        next();
    });
};

// WORK IN PROGRESS RUTA CART CON EL TOKEN