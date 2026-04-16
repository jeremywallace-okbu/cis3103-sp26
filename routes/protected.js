const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const router = express.Router();

router.get('/profile', (req, res) => {
    
    const user = db.prepare('SELECT id, username, admin, created_at FROM users WHERE id = ?').get(req.user.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
});

router.post('/update-password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword) {
        return res.status(400).json({ error: 'New password is required' });
    }
    
    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!await bcrypt.compare(currentPassword, user.password)) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, req.user.userId);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;