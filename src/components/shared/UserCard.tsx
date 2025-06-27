// import { Models } from "appwrite";
// import { Link } from "react-router-dom";

// import { Button } from "../ui/button";

// type UserCardProps = {
//   user: Models.Document;
// };

// const UserCard = ({ user }: UserCardProps) => {
//   return (
//     <Link to={`/profile/${user.$id}`} className="user-card">
//       <img
//         src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
//         alt="creator"
//         className="rounded-full w-14 h-14"
//       />

//       <div className="flex-center flex-col gap-1">
//         <p className="base-medium text-light-1 text-center line-clamp-1">
//           {user.name}
//         </p>
//         <p className="small-regular text-light-3 text-center line-clamp-1">
//           @{user.username}
//         </p>
//       </div>

//       <Button type="button" size="sm" className="shad-button_primary px-5">
//         Follow
//       </Button>
//     </Link>
//   );
// };

// export default UserCard;




import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { 
  useIsFollowing, 
  useFollowUser, 
  useUnfollowUser 
} from "@/lib/react-query/queriesAndMutations";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const { user: currentUser } = useUserContext();
  const { data: isFollowingUser = false } = useIsFollowing(currentUser.id, user.$id);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    
    if (isFollowingUser) {
      unfollowMutation.mutate({
        followerId: currentUser.id,
        followingId: user.$id,
      });
    } else {
      followMutation.mutate({
        followerId: currentUser.id,
        followingId: user.$id,
      });
    }
  };

  const isLoading = followMutation.isPending || unfollowMutation.isPending;
  const isCurrentUser = currentUser.id === user.$id;

  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      {!isCurrentUser && (
        <Button 
          type="button" 
          size="sm" 
          className={`px-5 ${
            isFollowingUser 
              ? 'bg-dark-4 text-light-1 hover:bg-dark-3' 
              : 'shad-button_primary'
          }`}
          onClick={handleFollowClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              <span className="text-xs">
                {isFollowingUser ? "Unfollowing..." : "Following..."}
              </span>
            </div>
          ) : (
            <span className="text-xs">
              {isFollowingUser ? "Following" : "Follow"}
            </span>
          )}
        </Button>
      )}
    </Link>
  );
};

export default UserCard;