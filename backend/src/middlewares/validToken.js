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
    
    // Verificar si el token está vencido
    jwt.verify(token, 'secreto-seguro', { ignoreExpiration: false }, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Redirigir al usuario a la página de inicio de sesión si el token ha expirado
                return res.redirect('/login');
            } else {
                return res.status(403).send('Acceso no autorizado. Token inválido.');
            }
        }
        req.user = user;
        next();
    });
};

export const checkAuthenticated = (req, res, next) => {
    // Check if the user is already authenticated (i.e., has a valid token)
    const cookies = req.headers.cookie;
    const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
    const token = tokenCookie && tokenCookie.split('=')[1];

    if (token) {
        // Verificar si el token está vencido
        jwt.verify(token, 'secreto-seguro', { ignoreExpiration: false }, (err) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Permitir que la solicitud continúe al siguiente middleware o ruta
                    next();
                } else {
                    // Otro error al verificar el token, manejar según sea necesario
                    return res.status(403).send('Acceso no autorizado. Token inválido.');
                }
            } else {
                // Si el token no ha expirado, redirigir a la ruta deseada
                return res.redirect('/');
            }
        });
    } else {
        // Si no hay token, permitir que la solicitud continúe al siguiente middleware o ruta
        next();
    }
};