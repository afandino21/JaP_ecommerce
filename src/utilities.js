import url from 'url';
import path from 'path';
import bcrypt from 'bcrypt';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password)
}