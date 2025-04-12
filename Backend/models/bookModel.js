import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
    name: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:Number, required: true},
    image: {type: Array, required:true},
    likes: {type: Number, default: 0},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
},
{ timestamps: true }
)
    
const bookModel = mongoose.models.book || mongoose.model('book', bookSchema);

export default bookModel