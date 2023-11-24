import express from 'express';
import pagesController from '../controllers/pagesController.js';
import jwt from 'jsonwebtoken';

const pagesRouter = express.Router();

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'secreto-seguro', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }
        req.user = decoded;
        next();
    });
};



// Rutas
pagesRouter.get('/', pagesController.getIndex);
pagesRouter.get('/login', pagesController.getLogin);
pagesRouter.get('/register', pagesController.getRegister);
pagesRouter.get('/categories', pagesController.getCategories);

// Requiere token para /cart
pagesRouter.get('/cart', pagesController.getCart);

pagesRouter.get('/my-profile', pagesController.getProfile);
pagesRouter.get('/product-info', pagesController.getProductInfo);
pagesRouter.get('/products', pagesController.getProducts);
pagesRouter.get('/sell', pagesController.getSell);

export default pagesRouter;
