import axios from 'axios';
import crypto from 'crypto';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import bookModel from '../models/bookModel.js';
import { sendConfirmationEmail } from '../utils/email.js';

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

const placeOrderPayStack = async (req, res) => {
  try {
    const { address, amount, book, user } = req.body;

    if (!address || !amount || !book || !user) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const userId = user._id || user.id
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const newOrder = new orderModel({
      user: userId,
      book,
      address,
      amount,
      paymentMethod: 'paystack',
      status: 'pending'
    });

    await newOrder.save();

    console.log("ENV PAYSTACK KEY:", paystackSecretKey);

    const paystackRes = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: address.email,
        amount: amount * 100,
        metadata: {
          orderId: newOrder._id.toString(),
          userId,
          bookId: book._id || book,
        },
        callback_url: `${process.env.FRONTEND_URL}/payment-success`

      },
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const { authorization_url } = paystackRes.data.data;

    // Send the authorization URL to client
    res.status(200).json({ authorization_url });

  } catch (error) {
    console.error("Paystack Order Error:", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to initialize Paystack payment." });
  }
};

const paystackWebhook = async (req, res) => {
  try {
    // Validate signature
    const hash = crypto
      .createHmac('sha512', paystackSecretKey)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).send('Invalid signature.');
    }

    const event = req.body;

    if (event.event === 'charge.success') {
      const paymentData = event.data;
      const orderId = new URL(paymentData.metadata?.callback_url || '').searchParams.get('orderId');

      // Update the order DB
      if (orderId) {
        const order = await orderModel.findById(orderId);

        if (order) {
          order.status = 'paid';
          order.transactionId = paymentData.reference;
          await order.save();
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).send('Webhook error');
  }
};



const verifyPaystackPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = response.data.data;

    if (data.status === 'success') {
      const { metadata } = data;
      const orderId = metadata?.orderId;
      const order = await orderModel.findById(orderId).populate("user");

      if (order) {
        order.status = 'paid';
        order.transactionId = reference;
        await order.save();

          await sendConfirmationEmail({
            to: order.user.email,
            name: order.user.name || order.user.nickname || "Customer",
            amount: order.amount,
            reference,
          });
      }

      return res.status(200).json({ message: 'Payment verified', order });
    } else {
      return res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Verification error:', error.message);
    res.status(500).json({ message: 'Could not verify payment' });
  }
};

const getUserBuyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
}

const getAllPaidOrders = async (req, res) => {
  try {
    const paidOrders = await orderModel.find({ status: { $in: ["paid", "shipped", "delivered"] },});
    res.json(paidOrders);
  } catch (error) {
    console.error("Error fetching paid orders:", error);
    res.status(500).json({ error: "Failed to fetch paid orders" });
  }
}

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find()
      .populate({
        path: 'book',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .populate('user');

    res.status(200).json({ success: true, orders: allOrders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    console.error("Status update failed:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export { placeOrderPayStack, paystackWebhook, verifyPaystackPayment, getUserBuyOrders, getAllOrders, getAllPaidOrders, updateOrderStatus };
