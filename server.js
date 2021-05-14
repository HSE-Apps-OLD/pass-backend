const express = require('express');
const app = express();

const connectDB = require('./config/db')
const cors = require('cors');
const auth = require('./middleware/auth')


connectDB();
app.use(cors());
app.use(express.json())

const routes = require("./routes/PassRoutes")
app.use('/', routes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`running on port ${PORT}`))