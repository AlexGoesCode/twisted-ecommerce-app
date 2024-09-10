import { useAuth } from '../context/AuthContext';
import { baseUrl } from '../config';

interface LikeButtonProps {
  itemId: string;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const LikeButton = ({ itemId, isLiked, fetchData }: LikeButtonProps) => {
  const { user, getUserProfile } = useAuth();
  console.log('isLiked :>> ', isLiked);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent div

    console.log('user :>> ', user);
    console.log('itemId :>> ', itemId);
    console.log('isLiked :>> ', isLiked);

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-type', 'application/x-www-form-uröencoded');
      myHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );

      const urlencoded = new URLSearchParams();
      urlencoded.append('itemId', itemId);
      urlencoded.append('userId', user?.id ?? '');

      if (!user?.id || !itemId) {
        alert('you need to login firt to like/unlike an item');
        return;
      }

      const url = `${baseUrl}/twisted-ecommerce/${itemId}/${
        isLiked ? 'unlike' : 'like'
      }`;

      const method = isLiked ? 'DELETE' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: myHeaders,
        body: urlencoded,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`${isLiked ? 'item unliked' : 'item like'}`, data);
        fetchData();
        getUserProfile();
      } else {
        console.log(`can't ${isLiked ? 'unlike' : 'like'} item`);
      }
    } catch (error) {
      console.log(`Error ${isLiked ? 'unliking' : 'liking'} item:`, error);
    }
  };

  return (
    <button
      className={`mt-2 px-4 py-2 rounded-lg ${
        isLiked ? 'bg-red-500 text-white' : 'bg-gray-300'
      }`}
      onClick={handleLike}
    >
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;
