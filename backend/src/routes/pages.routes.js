import express from 'express';
import pagesController from '../controllers/pagesController.js';
import jwt from 'jsonwebtoken';

const pagesRouter = express.Router();

// Rutas

pagesRouter.get('/', pagesController.getIndex);
pagesRouter.get('/login', pagesController.getLogin);
pagesRouter.get('/register', pagesController.getRegister);
pagesRouter.get('/categories', pagesController.getCategories);
pagesRouter.get('/cart', pagesController.getCart);
pagesRouter.get('/my-profile', pagesController.getProfile);
pagesRouter.get('/product-info', pagesController.getProductInfo);
pagesRouter.get('/products', pagesController.getProducts);
pagesRouter.get('/sell', pagesController.getSell);

export default pagesRouter;
