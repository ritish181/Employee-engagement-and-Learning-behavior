// server.js
const express = require('express');
const cors = require('cors');
const prisma = require('./config/db');


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Test endpoint to create a user
app.post('/api/users', async (req, res) => {
  try {
    const { username, password } = req.body; // Expect username and password in the request body
    const newUser = await User.create({ username, password }); // Create a new user
    res.status(201).json(newUser); // Respond with the created user
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Test endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.status(200).json(users); // Respond with the list of users
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/createuser', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  console.log(req)
  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
    },
  });
  console.log(newUser);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
