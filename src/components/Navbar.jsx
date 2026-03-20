import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-10">
      <Link to="/">
        <h1 className="text-xl font-bold text-[#8bbef8de] hover:opacity-80">
          GitPeek
        </h1>
      </Link>

      <Link
        to="/favorites"
        className="text-sm bg-[#21262d] px-3 py-1 rounded hover:bg-[#30363d]"
      >
        Favorites ⭐
      </Link>
    </nav>
  );
}

export default Navbar;
