import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { logout } from "@/store/slices/authSlice"; 
import ResearchChatLogo from "./ChattrLogo";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!auth.key;
  const username = auth.user?.username;

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <ResearchChatLogo className="w-8 h-8" />
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">ResearchChat</h1>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Welcome, <strong>{username}</strong>
            </span>
            <button
              onClick={() => dispatch(logout())}
              className="text-sm text-red-500 hover:underline"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-blue-600 hover:underline">Log In</Link>
            <Link to="/register" className="text-sm text-blue-600 hover:underline">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

