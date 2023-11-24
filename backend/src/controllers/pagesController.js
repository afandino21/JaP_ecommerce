import path from 'path';
import { __dirname, __filename } from '../utils.js';

const sendFile = (res, filename) => {
    const indexPath = path.join(__dirname, `../../frontend/html/${filename}.html`);
    res.sendFile(indexPath);
};

const pagesController = {
    getIndex: (req, res) => {
        sendFile(res, 'index');
    },

    getLogin: (req, res) => {
        sendFile(res, 'login');
    },

    getRegister: (req, res) => {
        sendFile(res, 'register');
    },

    getCategories: (req, res) => {
        sendFile(res, 'categories');
    },

    getCart: (req, res) => {
        sendFile(res, 'cart');
    },

    getProfile: (req, res) => {
        sendFile(res, 'my-profile');
    },

    getProductInfo: (req, res) => {
        sendFile(res, 'product-info');
    },

    getProducts: (req, res) => {
        sendFile(res, 'products');
    },

    getSell: (req, res) => {
        sendFile(res, 'sell');
    },
};

export default pagesController;
