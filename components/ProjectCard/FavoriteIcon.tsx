import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useToggleWishlistItemMutation } from "@/redux/wishlist/wishlistApi";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface UserData {
  _id: string;
}

const FavoriteIcon = ({ projectId }: { projectId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [toggleWishlist] = useToggleWishlistItemMutation();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    if (userDataString) {
      const userData: UserData = JSON.parse(userDataString);
      setUserId(userData._id);
    }
  }, []);

  const isWishlist = wishlistItems?.find(item => item?.propertyDetails?._id === projectId);

  const toggleWishlistItem = async () => {
    if (!userId) return;

    const data = {
      projectId: projectId,
      userId: userId
    };

    try {
      await toggleWishlist(data).unwrap();
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle wishlist item:", error);
    }
  };

  if (!userId) return null; // or a loading spinner

  return (
    <div className="absolute right-4 top-4" style={{ cursor: 'pointer' }}>
      {isWishlist ? (
        <FaHeart onClick={toggleWishlistItem} color="red" size={20} />
      ) : (
        <FaRegHeart onClick={toggleWishlistItem} color="gray" size={20} />
      )}
    </div>
  );
};

export default FavoriteIcon;
  