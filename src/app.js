// server.js
import express from 'express';
import routes from './routes/frontend.routes.js';
import routesBack from './routes/backend.routes.js';
import routesAuth from './routes/auth.routes.js';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import { config } from './config/config.js';
import { connectDB } from './config/dbConnect.js';
import { __filename, __dirname} from './utilities.js';

const app = express();
const port = 3000;
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));
app.use('/', routes);
app.use('/', routesBack);
app.use('/', routesAuth);

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});


