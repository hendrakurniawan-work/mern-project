const express = require('express');

const connectDB = require('./config/database');

// Initialize express
const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended:false }));

app.get('/', (req, res) => res.send('API running...'));

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
