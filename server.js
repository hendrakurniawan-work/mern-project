const express = require('express');
const path = require('path');
const connectDB = require('./config/database');

// Initialize express
const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended:false }));

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if(process.env.NODE_ENV === "production")
{
    //Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.hmtl"));
    });
}
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
