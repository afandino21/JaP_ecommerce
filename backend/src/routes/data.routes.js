import express from 'express';
import path from 'path';
import { __dirname, __filename } from '../utils.js';
import fs from 'fs/promises';
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
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

export default dataRoutes;