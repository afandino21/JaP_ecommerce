import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    segundoNombre: String,
    apellido: {
        type: String,
        required: true
    },
    segundoApellido: String,
    edad: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: Number,
    password: {
        type: String,
        required: true
    },
    token: String,
});

const User = mongoose.model('User', userSchema);

export default User;
