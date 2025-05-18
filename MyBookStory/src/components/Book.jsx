import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Book = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [image, setImage] = useState("")
  const { books, currency, navigate, soldBookIds } = useContext(ShopContext)
  const isSold = soldBookIds.includes(bookId);

  useEffect(() => {
      const book = books.find((book) => book._id === bookId);

      if (book) {
          setBookData(book);
          setImage(book.image[0])
      }
  }, [bookId, books]);

  if (!bookData) {
      return <p className="text-center text-gray-500">Loading book details...</p>;
  }


  return (
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 mt-3 mb-3'>

          <div className='flex gap-12 sm:gap-12 lex-col sm:flex-row'>

              {/* Book Images */}
              <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                  <div className='flex sm:flex-col overflow-hidden justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                      {
                          bookData.image.map((item, index) => (
                              <img onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} key={index} alt="" />
                          ))
                      }
                  </div>
                  <div className='w-full sm:w-[80%]'>
                      <img src={image} className='w-full h-auto' alt="" />
                  </div>
              </div>

              {/* Book Info */}
              <div className='flex-1'>
                  <h1 className='font-medium text-2xl mt-2'>{bookData.name}</h1>

                  <p className='mt-5 text-3xl font-medium'>{currency}{bookData.price}</p>
                  <p className='mt-5 text-gray-5500 md:w-4/5'>{bookData.description}</p>


                  <div className='flex flex-col gap-4 my-8'>
                      <p>CONDITION</p>
                      <div className='flex gap-2'>
                          <p className='border py-2 px-4 bg-gray-100'>PRE-OWNED</p>
                      </div>
                  </div>

                  <button disabled={isSold} onClick={() => navigate('/place-order', { state: { book: bookData } })} className={`px-8 py-3 text-sm text-white ${isSold ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'} active:bg-gray-700`}>{isSold ? "SOLD" : "PURCHASE"}</button>
                  <hr className='mt-8 sm:w-4/5' />
                  <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                      <p>100% Original Product</p>
                      <p>Verified Seller</p>
                      <p>Priority Delivery Available</p>

                  </div>
              </div>
          </div>
      </div>
  )
}

export default Book