require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');

const { authenticateToken, authenticateAdminToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/admin', authenticateAdminToken, require('./routes/admin'));
app.use('', authenticateToken, require('./routes/protected'));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
