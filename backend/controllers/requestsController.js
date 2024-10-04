const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all requests where approved = 0
exports.getRequests = async (req, res) => {
  try {
    const requests = await prisma.register.findMany({
      where: {
        approved: 0,
      },
    });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// Accept a request
exports.acceptRequest = async (req, res) => {
  const { u_id } = req.params;
  try {
    const updatedRequest = await prisma.register.update({
      where: { u_id: parseInt(u_id) }, // Assuming 'id' is the primary key
      data: { approved: 1 },
    });
    res.status(200).json({ message: 'Request accepted', updatedRequest });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Failed to accept request' });
  }
};

// Reject a request
exports.rejectRequest = async (req, res) => {
  const { u_id } = req.params;
  try {
    await prisma.register.delete({
      where: { u_id: parseInt(u_id) },
    });
    res.status(200).json({ message: 'Request rejected' });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ error: 'Failed to reject request' });
  }
};

