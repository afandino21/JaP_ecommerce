import express from 'express';
import pagesController from '../controllers/pagesController.js';
import { authenticateToken } from '../middlewares/validToken.js';
import { checkAuthenticated } from '../middlewares/validToken.js';
import jwt from 'jsonwebtoken';

const pagesRouter = express.Router();

// Rutas

pagesRouter.get('/', authenticateToken, pagesController.getIndex);
pagesRouter.get('/login',checkAuthenticated, pagesController.getLogin);
pagesRouter.get('/register',checkAuthenticated, pagesController.getRegister);
pagesRouter.get('/categories', authenticateToken, pagesController.getCategories);
pagesRouter.get('/cart', authenticateToken, pagesController.getCart);
pagesRouter.get('/my-profile', authenticateToken, pagesController.getProfile);
pagesRouter.get('/product-info', authenticateToken, pagesController.getProductInfo);
pagesRouter.get('/products', authenticateToken, pagesController.getProducts);
pagesRouter.get('/sell', authenticateToken, pagesController.getSell);

export default pagesRouter;
