import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import pagesRouter from './routes/pages.routes.js';
import routesAuth from './routes/auth.routes.js';
import dataRoutes from './routes/data.routes.js';
import { connectDB } from './config/databaseConfig.js';
import { config } from './config/dotenvConfig.js';
import { __dirname, __filename } from './utils.js';

const app = express();
const port = 3000;
connectDB();

app.use(session({
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use('/', pagesRouter);
app.use('/', routesAuth);
app.use('/', dataRoutes);


app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});