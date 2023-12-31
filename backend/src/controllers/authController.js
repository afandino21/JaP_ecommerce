import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { isValidPassword, createHash } from '../utils.js';

const authController = {
    register: async (req, res) => {
        try {
            const { nombre, segundoNombre, apellido, segundoApellido, edad, email, telefono, password } = req.body;
            console.log(req.body);
            const hashedPassword = await createHash(password);
            const user = new User({
                nombre,
                segundoNombre,
                apellido,
                segundoApellido,
                edad,
                email,
                telefono,
                password: hashedPassword
            });
            await user.save();
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al registrar: ' + error.message);
        }
    },

    updateDetails: async (req, res) => {
        try {
            const { nombre, segundoNombre, apellido, segundoApellido, email, telefono } = req.body;
            console.log(req.body);

            if (!nombre || !segundoNombre || !apellido || !segundoApellido || !email || !telefono) {
                return res.status(400).send('Todos los campos son obligatorios');
            }
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(404).send('Usuario no encontrado');
            }
            existingUser.nombre = nombre;
            existingUser.segundoNombre = segundoNombre;
            existingUser.apellido = apellido;
            existingUser.segundoApellido = segundoApellido;
            existingUser.telefono = telefono;
            await existingUser.save();

            res.status(200).send('Haz guardado tus datos correctamente');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar el usuario');
        }
    },

    getDetails: async (req, res) => {
        try {
            const userEmail = req.params.email;

            if (!userEmail) {
                return res.status(400).send('El correo electrónico es obligatorio');
            }

            const existingUser = await User.findOne({ email: userEmail });

            if (!existingUser) {
                return res.status(404).send('Usuario no encontrado');
            }

            const userInformation = {
                nombre: existingUser.nombre,
                segundoNombre: existingUser.segundoNombre,
                apellido: existingUser.apellido,
                segundoApellido: existingUser.segundoApellido,
                email: existingUser.email,
                telefono: existingUser.telefono
            };

            res.status(200).json(userInformation);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener la información del usuario');
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email});

            if (user && (await isValidPassword(user, password))) {
                const token = jwt.sign({ username: user.email, userId: user._id }, 'secreto-seguro', { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: false });
                res.redirect(`/?token=${token}`);
            } else {
                res.status(401).send('Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al iniciar sesión: ' + error.message);
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        res.redirect('/login');
    },
};

export default authController;
