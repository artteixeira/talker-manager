const regex = /^[A-Za-z0-9]{16}$/;

const validateToken = async (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ message: 'Token não encontrado' }); 
    if (!regex.test(token)) return res.status(401).json({ message: 'Token inválido' });
    next();
};

module.exports = validateToken;