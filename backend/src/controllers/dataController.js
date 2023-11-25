import path from 'path';
import fs from 'fs/promises';
import { __dirname } from '../utils.js';

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error al leer el archivo JSON de productos' + error);
    }
};

const dataController = {
    getCats: async (req, res) => {
        const filePath = path.join(__dirname, 'data/cats/cat.json');

        try {
            const data = await readFile(filePath);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getSellPublish: async (req, res) => {
        const filePath = path.join(__dirname, 'data/sell/publish.json');

        try {
            const data = await readFile(filePath);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
        }
    },

    getCatsProducts: async (req, res) => {
        const { id } = req.params;
        const fileName = path.join(__dirname, `data/cats_products/${id}.json`);

        try {
            const data = await readFile(fileName);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
        }
    },

    getProducts: async (req, res) => {
        const { id } = req.params;
        const fileName = path.join(__dirname, `data/products/${id}.json`);

        try {
            const data = await readFile(fileName);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
        }
    },

    getProductsComments: async (req, res) => {
        const { id } = req.params;
        const fileName = path.join(__dirname, `data/products_comments/${id}.json`);

        try {
            const data = await readFile(fileName);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
        }
    },

    getUserCart: async (req, res) => {
        const { id } = req.params;
        const fileName = path.join(__dirname, `data/user_cart/${id}.json`);

        try {
            const data = await readFile(fileName);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
        }
    },

    getCart: async (req, res) => {
        const filePath = path.join(__dirname, 'data/cart/buy.json');

        try {
            const data = await readFile(filePath);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
        }
    },

    postCart: async (req, res) => {
        const { email, productInfo } = req.body;

        if (!email || !productInfo) {
            return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
        }

        try {
            const cartInfoPath = path.join(__dirname, 'data/cartInfo/cartInfo.json');
            const data = await fs.readFile(cartInfoPath, 'utf8');
            let cartInfo = JSON.parse(data);
            cartInfo[email] = { email, productInfo };
            const jsonData = JSON.stringify(cartInfo, null, 2);
            await fs.writeFile(cartInfoPath, jsonData);
            console.log('Archivo cartInfo.json actualizado con éxito.');
            res.status(200).json({ message: 'Carrito guardado con éxito.' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },

    getCartByEmail: (req, res) => {
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({ error: 'Falta el email en la solicitud.' });
        }

        const cartInfoPath = path.join(__dirname, 'data/cartInfo/cartInfo.json');

        fs.readFile(cartInfoPath, 'utf8')
            .then(data => {
                const cartInfo = JSON.parse(data);
                const userCart = cartInfo[email] || {};
                res.status(200).json({ productInfo: userCart.productInfo || [] });
            })
            .catch(err => {
                console.error('Error al leer el archivo cartInfo.json:', err);
                res.status(500).json({ error: 'Error interno del servidor al leer el archivo.' });
            });
    },
};

export default dataController;
