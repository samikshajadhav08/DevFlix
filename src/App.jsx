import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import MovieList from "./Components/MovieList.jsx";
import TopRated from "./Components/TopRated";
import Upcoming from "./Components/UpComing.jsx";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./Components/Footer.jsx";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar onSearch={setSearch} />

      <Routes>
        <Route path="/" element={<MovieList search={search} />} />
        <Route path="/toprated" element={<TopRated search={search} />} />
        <Route path="/upcoming" element={<Upcoming search={search} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
