import express from 'express'
import { placeOrderPayStack, paystackWebhook, verifyPaystackPayment, getUserBuyOrders, getAllOrders, getAllPaidOrders, updateOrderStatus  } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import orderModel from '../models/orderModel.js';


const orderRouter = express.Router()


orderRouter.post('/paystack', authUser, placeOrderPayStack);
orderRouter.get('/userBuyOrders', authUser, getUserBuyOrders);
orderRouter.get('/allPaidOrders', getAllPaidOrders);
orderRouter.post('/paystack/webhook', express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }), paystackWebhook);
orderRouter.get('/verify/:reference', verifyPaystackPayment);
orderRouter.get('/all', adminAuth, getAllOrders);
orderRouter.put('/update-status/:id', adminAuth, updateOrderStatus);



export default orderRouter










//Test for aut delete


// orderRouter.get('/cleanup-orders', async (req, res) => {
//   const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
//   const result = await orderModel.deleteMany({
//     status: 'pending',
//     createdAt: { $lt: cutoff },
//   });

//   res.json({ message: `Deleted ${result.deletedCount} old pending orders` });
// });