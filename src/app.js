// server.js
import express from 'express';
import routes from './routes/frontend.routes.js';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/', routes);

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});
