require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Access denied' });

    // Verifica que el encabezado contenga el prefijo 'Bearer'
    const token = authHeader.split(' ')[1]; // Divide el encabezado y toma solo el token
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
