import express from 'express';
import fs from 'fs/promises'; // Nota: fs/promises es la versión basada en promesas de fs en Node.js
const routesBack = express.Router();


//Falta el post y get del cart 


//Obtiene las categorias 
routesBack.get('/cats', async (req, res) => {
    const filePath = 'data/cats/cat.json'; // Asegúrate de que la ruta sea correcta

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

//Obtiene cada categoria por su id y sus productos ej: /cats/101
routesBack.get('/cats/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = `data/cats_products/${id}.json`;

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

//Obtiene un producto especifico y sus productos relacionados ej: /products/50741
routesBack.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = `data/products/${id}.json`;

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

//Obtiene los comentarios de un producto en especifico ej: /products_comments/50741
routesBack.get('/products_comments/:id', async (req, res) => {
    const { id } = req.params;
    const fileName = `data/products_comments/${id}.json`;

    try {
        const data = await fs.readFile(fileName, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo JSON de productos' });
    }
});

export default routesBack;