import { useEffect, useState } from "react";
import "./openAi.scss";
import axios from "axios";
import { FiSearch } from "react-icons/fi";


function OpenAi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
  };
  function copyResult() {
    navigator.clipboard
      .writeText(searchResults)
      .then(() => {
        alert("Result copied to clipboard!");
      })
      .catch((err) => {
        console.log("Failed to copy result: ", err);
      });
  }


  useEffect(() => {
    if (isSearching) {
      // const dotenv = require("dotenv");
      // dotenv.config();

      const client = axios.create({
        headers: {
          Authorization:
            "Bearer " + process.env.openAI_Secret,
        },
      });

      const params = {
        prompt: searchQuery,
        max_tokens: 500,
        temperature: 1,
        n: 1,
      };

      client
        .post(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          params
        )
        .then((results) => {
          setSearchResults(results.data.choices[0].text);
          setIsSearching(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isSearching, searchQuery]);

  console.log(searchResults);

  return (
    <div className="openAi">
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="searchButton" onClick={handleSearch}>
            <FiSearch className="searchIcon"></FiSearch>
          </button>
        </div>
      </div>
      <div className="flex-column">
        <textarea className="result" type="text" value={searchResults}></textarea>
        <button className="copy-btn" onClick={() => copyResult()}>Copy Result</button>
      </div>
    </div>
  );
}

export default OpenAi;
