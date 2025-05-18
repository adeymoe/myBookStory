import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
    book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
          },
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, required: true, default:'Order Placed'},
    paymentMethod: {type: String, required: true},
    payment: {type: Boolean, required: true, default: false},
},
{ timestamps: true }
)


const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default orderModel;