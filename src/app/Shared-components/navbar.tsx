
import React from "react";

const NavBar: React.FC = () => (
  <nav className="flex items-center justify-between px-8 py-4 bg-black text-white mb-4">
    <span className="text-2xl font-bold text-yellow-400">Moovie</span>

    <div className="flex-1 mx-8">
      <input
        type="text"
        placeholder="Search"
        className="w-full max-w-md px-4 py-2 rounded-full outline-none bg-gray-900 text-white border border-gray-800"
      />
    </div>

    <div className="flex items-center gap-6">
      <a href="/" className="text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1">Home</a>
      <a href="/favorites" className="hover:text-yellow-400">Favorites</a>
      <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"> <a href="/signin">Sign in</a></button>
    </div>
  </nav>
);

export default NavBar;
