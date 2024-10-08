// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
     const decoded = jwt.verify(token, 'ritish');
    console.log(decoded)
 req.user = decoded;
 next();
 } catch (error) {
    console.log(error)
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;