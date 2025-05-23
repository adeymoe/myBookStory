import React, { useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import { ShopContext } from '../context/ShopContext';
import Spinner from './Spinner';
import { useState } from 'react';

const BookCollection = () => {
  const { books, currency, soldBookIds, getAllSoldBooks, token } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getAllSoldBooks();
    }
    const checkBooks = setInterval(() => {
    if (books.length > 0) {
      setLoading(false);
      clearInterval(checkBooks);
    }
  }, 100);

  return () => clearInterval(checkBooks);
  }, [books]);
  
  if (loading) return <Spinner />;
  return (
    <div className="container mx-auto pt-4 pb-12">
      <nav className="w-full px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Book Collection</h1>
        <SearchBar />
      </nav>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3">
        {[...books].reverse().map((book) => {
          const isSold = soldBookIds.includes(book._id);

          return (
            <div
              key={book._id}
              className="relative"
            >
              <Link
                to={`/bookdetail/${book._id}`}
                className={`block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 ${isSold ? 'opacity-50 grayscale pointer-events-none' : ''
                  }`}
              >
                <div className="relative">
                  <img
                    className="w-full h-[300px] object-cover"
                    src={book.image[0]}
                    alt={book.name}
                  />
                  {isSold && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                      SOLD
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-base truncate">
                    {book.name}
                  </h3>
                  <LikeButton bookId={book._id} />
                </div>
                <p className="text-gray-700 font-bold text-lg">
                  {currency}{book.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookCollection;
