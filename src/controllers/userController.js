const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { name, email, role } = req.body;
    if (!name || !email || !role) return res.status(400).json({ error: 'name, email and role are required' });
    if (!['customer', 'transporter'].includes(role)) return res.status(400).json({ error: 'role must be customer or transporter' });

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already exists' });

        const user = new User({ name, email, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-__v');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
