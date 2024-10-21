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

const employeeCount = async(req, res) => {
  try {
    const employees = await prisma.register.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  employeeCount,
};
