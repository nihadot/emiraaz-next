import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useToggleWishlistItemMutation } from "@/redux/wishlist/wishlistApi";
import { LOCAL_STORAGE_KEYS } from "@/api/storage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { error } from "console";
import { errorToast } from "../Toast";

interface UserData {
  _id: string;
}

const FavoriteIcon = ({ projectId }: { projectId: string }) => {
  // console.log('first',projectId)
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
    if (!userId) {
      errorToast("Please login to favorite this project");  
      return;
    };

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

  
  // if (!userId) return null; // or a loading spinner

  // console.log('first')

  return (
    <div className="absolute right-[15.5px] top-[15.5px]" style={{ cursor: 'pointer' }}>
      {isWishlist ? (
        <GoHeartFill onClick={toggleWishlistItem} color="red" size={25} />
      ) : (
        <GoHeart onClick={toggleWishlistItem} color="gray" size={25} />
      )}
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. In recusandae aperiam consequatur nam sunt nemo voluptate cumque omnis mollitia, minima deleniti! Suscipit a, odio accusantium ut consequatur tempora reiciendis ab? */}
    </div>
  );
};

export default FavoriteIcon;
  