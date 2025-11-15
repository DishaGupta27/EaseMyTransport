const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const userId = req.header('x-user-id');
    if (!userId) {
        req.user = null;
        return next();
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: 'Invalid x-user-id header' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Auth error' });
    }
};

module.exports = authMiddleware;
