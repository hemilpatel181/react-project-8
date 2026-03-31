import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-900/80 border-b border-white/10 px-8 py-4 flex justify-between items-center shadow-2xl">
      
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        User crud operation
      </h1>

      <div className="flex gap-4 text-sm font-medium">
        
        <Link to="/" className="px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-cyan-400/20 backdrop-blur-md transition duration-300">
          Home
        </Link>

        <Link to="/form" className="px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-cyan-400/20 backdrop-blur-md transition duration-300">
          Add
        </Link>

        <Link to="/display" className="px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-cyan-400/20 backdrop-blur-md transition duration-300">
          Users
        </Link>

        <Link to="/deleted" className="px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-cyan-400/20 backdrop-blur-md transition duration-300">
          Deleted
        </Link>

      </div>
    </nav>
  );
};

export default Topbar;