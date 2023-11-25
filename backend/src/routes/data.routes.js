import express from 'express';
import dataController from '../controllers/dataController.js';

const dataRoutes = express.Router();

dataRoutes.get('/cats/cat', dataController.getCats);
dataRoutes.get('/sell/publish', dataController.getSellPublish);
dataRoutes.get('/cats_products/:id', dataController.getCatsProducts);
dataRoutes.get('/products/:id', dataController.getProducts);
dataRoutes.get('/products_comments/:id', dataController.getProductsComments);
dataRoutes.get('/user_cart/:id', dataController.getUserCart);
dataRoutes.get('/cart', dataController.getCart);
dataRoutes.post('/cart', dataController.postCart);
dataRoutes.get('/cart/:email', dataController.getCartByEmail);

export default dataRoutes;
