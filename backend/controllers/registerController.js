const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { u_name, email, password, d_id } = req.body;

  try {
    const newUser = await prisma.register.create({
      data: {
        u_name,
        email,
        password,
        d_id,
        registrationDate: new Date(), // Automatically set the registration date
      },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while registering the user" });
  }
};

module.exports = {
  registerUser,
};
