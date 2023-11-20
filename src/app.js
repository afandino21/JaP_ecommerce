// server.js
import express from 'express';
import routes from './routes/frontend.routes.js';
import routesBack from './routes/backend.routes.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('public'));
app.use('/', routes);
app.use('/', routesBack);

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});


