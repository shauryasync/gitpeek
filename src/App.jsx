import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";

function App() {
  const onSearch = () => {
    console.log("searching...");
  };
  const [searchText, setSearchText] = useState("");
  return (
    <div className="bg-[#634B66] min-h-screen">
      <Navbar />
      <SearchBar
        searchText={searchText}
        onSearch={onSearch}
        setSearchText={setSearchText}
      />
    </div>
  );
}

export default App;
