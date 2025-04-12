import { useState, useEffect, useContext } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const LikeButton = ({bookId}) => {
  const { user, token } = useContext(ShopContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like product.");
      return;
    }

    try {
      const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/book/like`,
  { bookId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  } 
      );

      if (response.data.success) {
        setLiked(!liked);
        setLikes(response.data.likes);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error liking the book:", error);
      alert("Something went wrong. Try again!");
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/book/like-status?bookId=${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } 
        );
        if (response.data.success) {
          setLiked(response.data.liked);
          setLikes(response.data.likes);
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [user, bookId, token]);


  return (
    <span className="flex items-center cursor-pointer space-x-2" onClick={handleLike}>
      <Heart
        size={20}
        className={`${liked ? "text-red-500" : "text-gray-500"} hover:text-black`}
        fill={liked ? "red" : "none"}
      />
      <span className="text-sm font-medium text-gray-700">{likes}</span>
    </span>
  );
};

export default LikeButton;
