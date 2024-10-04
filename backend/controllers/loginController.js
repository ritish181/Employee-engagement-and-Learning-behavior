const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
        const user = await prisma.register.findUnique({
            where: {email},
        });

        // If the user is not found, return an error response
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Validate password (add password hashing logic here if needed)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If login is successful, return the user's role
        res.json({ role: user.role });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };


