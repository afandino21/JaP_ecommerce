import express from 'express';
import authController from '../controllers/authController.js';

const routesAuth = express.Router();

// Rutas

routesAuth.post('/register', authController.register);
routesAuth.put('/details', authController.updateDetails);
routesAuth.get('/details/:email', authController.getDetails);
routesAuth.post('/login', authController.login);
routesAuth.post('/logout', authController.logout);

export default routesAuth;
