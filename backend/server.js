// server.js
const express = require('express');
const cors = require('cors');
const prisma = require('./config/db');
const bodyParser =  require('body-parser');
const registerRoutes = require("./routes/registerRoutes");
const departmentRoutes = require('./routes/departmentRoutes')

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', registerRoutes);
app.use('/api', departmentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
