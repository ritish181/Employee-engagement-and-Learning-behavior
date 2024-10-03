const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const department = async (req, res) => {
  try {
    const department = await prisma.department.findMany({
        where:{
            NOT:[{
                d_name: "Admin"
            }]
        }
    })

    res.status(201).json({ message: "departments fetched successfully", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching departments" });
  }
};

module.exports = {
  department,
};
