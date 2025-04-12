import { v2 as cloudinary } from "cloudinary"
import bookModel from "../models/bookModel.js"


const likeBook = async (req, res) => {
    try {
        const{bookId} = req.body;
        const userId = req.userId

        const book = await bookModel.findById(bookId);
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });

        if (book.likedBy.includes(userId)) {
            // Unlike
            book.likes -= 1;
            book.likedBy = book.likedBy.filter((id) => id.toString() !== userId);
          } else {
            // Like
            book.likes += 1;
            book.likedBy.push(userId);
          }

          await book.save();
    res.json({ success: true, likes: book.likes });
        
    } catch (error) {
        console.error("Error liking/unliking book:", error);
    res.status(500).json({ success: false, message: "Server error" });
    }
}

const likeStatus = async (req, res) => {
    try {
        const userId = req.userId;
        const { bookId } = req.query;
    
        const book = await bookModel.findById(bookId);
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    
        const liked = book.likedBy.includes(userId);
        const likes = book.likedBy.length;
    
        res.status(200).json({ success: true, liked, likes });
      } catch (error) {
        console.error("Error fetching like status:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
}

const addBook = async (req, res) => {
    try {
        
        const {name, description, price, user} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type: "image"});
                return result.secure_url
            })
        )

        const bookData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            likes: 0,
            user,
        }

        const book = new bookModel(bookData);
        await book.save() 
        


        res.json ({success:true, message: "Book Added"})
        
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
        
    }
    
}

const listBooks = async (req, res) => {
    try {

        const books = await bookModel.find({})
        res.json({success:true,books})

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
        
    }
    
}

const removeBook = async (req, res) =>{
    try {
        await bookModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Book Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}



export {addBook, listBooks, likeBook, likeStatus, removeBook}