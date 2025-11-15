const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

exports.createPayment = async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Provide x-user-id header' });
    if (user.role !== 'customer') return res.status(403).json({ error: 'Only customers can create payments' });

    const { bookingId, amount } = req.body;
    if (!bookingId || typeof amount !== 'number') return res.status(400).json({ error: 'bookingId and numeric amount required' });

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        if (booking.customerId.toString() !== user._id.toString()) return res.status(403).json({ error: 'You are not the customer for this booking' });
        const existing = await Payment.findOne({ bookingId });
        if (existing) return res.status(400).json({ error: 'Payment already exists for this booking' });

        const payment = new Payment({ bookingId, amount, status: 'pending' });
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getPaymentByBooking = async (req, res) => {
    const user = req.user;
    const bookingId = req.params.bookingId;

    if (!user) return res.status(401).json({ error: 'Provide x-user-id header' });

    try {
        const payment = await Payment.findOne({ bookingId }).populate({
            path: 'bookingId',
            populate: { path: 'customerId transporterId', select: 'name email role' }
        });
        if (!payment) return res.status(404).json({ error: 'Payment not found' });

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        const isCustomer = booking.customerId.toString() === user._id.toString();
        const isTransporter = booking.transporterId && booking.transporterId.toString() === user._id.toString();

        if (!isCustomer && !isTransporter) return res.status(403).json({ error: 'Not authorized to view this payment' });

        res.json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
