import express from 'express'
import { addBook, listBooks, likeBook, likeStatus, removeBook, deleteBook, allBooks, updateBook } from '../controllers/bookController.js'
import upload from '../middleware/multer.js';
import authUser from '../middleware/auth.js';
import adminAuth from "../middleware/adminAuth.js";

const bookRouter = express.Router();

bookRouter.post('/add',upload.fields([{name:'image1',maxCount:1}, {name:'image2',maxCount:1}, {name:'image3',maxCount:1}, {name:'image4',maxCount:1}]), addBook);
bookRouter.get('/list', listBooks);
bookRouter.post('/like', authUser, likeBook );
bookRouter.get('/like-status', authUser, likeStatus)
bookRouter.post('/remove', authUser, removeBook)
bookRouter.get('/all', adminAuth, allBooks)
bookRouter.post('/delete/:id', adminAuth, deleteBook)
bookRouter.put('/update/:id', adminAuth, updateBook)


export default bookRouter