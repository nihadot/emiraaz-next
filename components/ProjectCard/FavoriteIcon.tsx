import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const FavoriteIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="absolute right-4 top-4" onClick={() => setIsFavorite(prev => !prev)} style={{ cursor: 'pointer' }}>
      {isFavorite ? (
        <FaHeart color="red" size={20} />
      ) : (
        <FaRegHeart color="gray" size={20} />
      )}
    </div>
  );
};

export default  FavoriteIcon;
