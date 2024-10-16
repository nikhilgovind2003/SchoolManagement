import jwt from "jsonwebtoken"
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging line
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
