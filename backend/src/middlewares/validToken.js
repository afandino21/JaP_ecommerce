import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    // Obtener el encabezado "Cookie" de la solicitud
    const cookies = req.headers.cookie;
    // Verificar si existe la cookie llamada "token"
    const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
    // Extraer el valor del token de la cookie
    const token = tokenCookie && tokenCookie.split('=')[1];
    if (!token) {
        return res.redirect('/login');
    }
    jwt.verify(token, 'secreto-seguro', (err, user) => {
        if (err) {
            return res.status(403).send('Acceso no autorizado. Token inválido.');
        }
        req.user = user;
        next();
    });
};

// Middleware to check if the user is already authenticated
export const checkAuthenticated = (req, res, next) => {
    // Check if the user is already authenticated (i.e., has a valid token)
    const cookies = req.headers.cookie;
    const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
    const token = tokenCookie && tokenCookie.split('=')[1];

    if (token) {
        // If the user is already authenticated, redirect to a different route or handle as needed
        return res.redirect('/');
    }

    // If not authenticated, proceed to the next middleware or route handler
    next();
};
// WORK IN PROGRESS RUTA CART CON EL TOKEN