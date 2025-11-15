const Booking = require('../models/Booking');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Provide x-user-id header to identify the customer' });
    if (user.role !== 'customer') return res.status(403).json({ error: 'Only customers can create bookings' });

    const { pickupLocation, dropLocation, transporterId } = req.body;
    if (!pickupLocation || !dropLocation) return res.status(400).json({ error: 'pickupLocation and dropLocation required' });

    try {
        if (transporterId) {
            const t = await User.findById(transporterId);
            if (!t || t.role !== 'transporter') return res.status(400).json({ error: 'transporterId is not a valid transporter' });
        }
        const booking = new Booking({
            customerId: user._id,
            transporterId: transporterId || undefined,
            pickupLocation,
            dropLocation,
            status: transporterId ? 'assigned' : 'pending'
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getBookings = async (req, res) => {
    const user = req.user;
    const { page = 1, limit = 10 } = req.query;

    try {
        const q = {};
        if (!user) {
            return res.status(401).json({ error: 'Provide x-user-id header to view bookings' });
        }

        if (user.role === 'customer') {
            q.customerId = user._id;
        } else if (user.role === 'transporter') {
            q.transporterId = user._id;
        }

        const skip = (Math.max(1, parseInt(page)) - 1) * Math.max(1, parseInt(limit));
        const total = await Booking.countDocuments(q);
        const bookings = await Booking.find(q)
            .populate('customerId', 'name email role')
            .populate('transporterId', 'name email role')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            data: bookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateBookingStatus = async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Provide x-user-id header' });
    if (user.role !== 'transporter') return res.status(403).json({ error: 'Only transporter can update booking status' });

    const bookingId = req.params.id;
    const { status } = req.body;
    if (!['pending', 'assigned', 'completed'].includes(status)) return res.status(400).json({ error: 'Invalid status' });

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        if (!booking.transporterId || booking.transporterId.toString() !== user._id.toString()) {
            return res.status(403).json({ error: 'Transporter not assigned to this booking' });
        }

        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
