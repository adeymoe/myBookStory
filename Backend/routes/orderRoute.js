import express from 'express'
import { placeOrderPayStack, paystackWebhook, verifyPaystackPayment, getUserBuyOrders  } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router()


orderRouter.post('/paystack', authUser, placeOrderPayStack);
orderRouter.get('/userBuyOrders', authUser, getUserBuyOrders);
orderRouter.post('/paystack/webhook', express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }), paystackWebhook);
orderRouter.get('/verify/:reference', verifyPaystackPayment);



export default orderRouter