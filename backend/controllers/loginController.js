const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {
  const { email, password } = req.body;
    console.log(email)
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
        console.log("login user" + user)
        // If login is successful, return the user's role
        const token = jwt.sign({ userId: user.u_id, role: user.role }, 'ritish', {
            expiresIn: '1h',
        });
        res.status(200).json({ token, role: user.role, u_id: user.u_id });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };


