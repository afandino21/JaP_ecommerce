import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { __dirname, __filename } from '../utils.js';

const dataRoutes = express.Router();

dataRoutes.get('/cats/cat', async (req, res) => {
    const filePath = path.join(__dirname, 'data/cats/cat.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' + error });
    }
});

dataRoutes.get('/sell/publish', async (req, res) => {
    const filePath = path.join(__dirname, 'data/sell/publish.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

dataRoutes.get('/cats_products/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = path.join(__dirname, `data/cats_products/${id}.json`);

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

dataRoutes.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = path.join(__dirname, `data/products/${id}.json`);

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

dataRoutes.get('/products_comments/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = path.join(__dirname, `data/products_comments/${id}.json`);

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

dataRoutes.get('/user_cart/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = path.join(__dirname, `data/user_cart/${id}.json`);

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

dataRoutes.get('/cart', async (req, res) => {
    const filePath = path.join(__dirname, 'data/cart/buy.json');

    try {
        const data = await readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

// Defino cartInfoPath para ambas funciones de abajo

const cartInfoPath = path.join(__dirname, 'data/cartInfo/cartInfo.json');

dataRoutes.post('/cart', async (req, res) => {
    const { email, productInfo } = req.body;
    console.log(req.body);

    // Verificar que email y productInfo estén presentes en la solicitud
    if (!email || !productInfo) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
    }

    try {
        // Construir la ruta completa al archivo cartInfo.json
        const cartInfoPath = path.join(__dirname, 'data/cartInfo/cartInfo.json');

        // Leer el archivo cartInfo.json
        const data = await fs.readFile(cartInfoPath, 'utf8');
        let cartInfo = JSON.parse(data);

        // Sobreescribir o agregar el carrito al objeto cartInfo
        cartInfo[email] = { email, productInfo };

        // Convertir el objeto a formato JSON
        const jsonData = JSON.stringify(cartInfo, null, 2);

        // Guardar el archivo cartInfo.json
        await fs.writeFile(cartInfoPath, jsonData);

        console.log('Archivo cartInfo.json actualizado con éxito.');
        res.status(200).json({ message: 'Carrito guardado con éxito.' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para el boton cargar

dataRoutes.get('/cart/:email', (req, res) => {
    const email = req.params.email;

    // Verificar que el email esté presente en la solicitud
    if (!email) {
        return res.status(400).json({ error: 'Falta el email en la solicitud.' });
    }

    // Construir la ruta completa al archivo cartInfo.json
    const cartInfoPath = path.join(__dirname, 'data/cartInfo/cartInfo.json');

    // Leer el archivo cartInfo.json
    fs.readFile(cartInfoPath, 'utf8')
        .then(data => {
            const cartInfo = JSON.parse(data);

            // Obtener el carrito correspondiente al email
            const userCart = cartInfo[email] || {};

            // Enviar el carrito como respuesta
            res.status(200).json({ productInfo: userCart.productInfo || [] });
        })
        .catch(err => {
            console.error('Error al leer el archivo cartInfo.json:', err);
            res.status(500).json({ error: 'Error interno del servidor al leer el archivo.' });
        });
});

export default dataRoutes;