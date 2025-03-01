import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

 // Icons for toggle

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar fixed top-0 left-0 w-full bg-black z-50 px-5 py-4 flex justify-between items-center">
      {/* Left Side - Logo & Toggle */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex gap-3 items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-purple-500">
            Fantagram
          </h2>
        </Link>

       
      </div>

      {/* Right Side - Logout & Profile */}
      <div className="flex gap-4">
        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>
        <Link to={`/profile/${user.id}`} className="flex-center gap-3">
          <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="profile" className="h-8 w-8 rounded-full" />
        </Link>
      </div>
    </section>
  );
};

export default Topbar;
