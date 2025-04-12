import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const UploadBook = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState(Array(4).fill(null));
  const [previewUrls, setPreviewUrls] = useState(Array(4).fill(null)); //Store image URLs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(ShopContext)

  // Handle image change & generate preview URLs
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);

      // Create a preview URL
      const updatedPreviews = [...previewUrls];
      updatedPreviews[index] = URL.createObjectURL(file);
      setPreviewUrls(updatedPreviews);
    }
  };

 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('user', user.id)

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(`${backendUrl}/api/book/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        setTimeout(() => {
          navigate('/profile');
        }, 2000);

        setImages(Array(4).fill(null));
        setPreviewUrls(Array(4).fill(null)); // Reset preview URLs
        setName('');
        setDescription('');
        setPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  //  Cleanup Object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 mt-6 mb-3 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      {/* Upload multiple images */}
      <div className="w-full">
        <p className="mb-3 text-gray-700 font-medium">Upload Pictures of Book</p>
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
              <img
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg object-cover hover:border-gray-500 transition"
                src={previewUrls[index] || assets.upload_area}
                alt="Upload"
              />
              <input onChange={(e) => handleImageChange(e, index)} type="file" id={`image${index + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Book Name */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Book Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 transition"
          type="text"
          placeholder="Input book name"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 transition resize-none h-28"
          placeholder="Write a detailed description (include state/condition of product)"
          required
        />
      </div>

      {/* Price */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 transition"
          type="number"
          placeholder="Input asking price"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`w-full text-white font-medium py-3 rounded-lg transition ${
          loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Book'}
      </button>
    </form>
  );
};

export default UploadBook;
