import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <>
      <nav>
        <Link to="/" className="title">
          DevFlix
        </Link>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Popular</NavLink>
          </li>
          <li>
            <NavLink to="/toprated">Top Rated</NavLink>
          </li>
          <li>
            <NavLink to="/upcoming">Upcoming</NavLink>
          </li>

          <li>
            <input
              type="text"
              className="searchbar"
              name="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Movies...."
            />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
