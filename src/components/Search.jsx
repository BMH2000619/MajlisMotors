import React, { useState } from "react"

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() === "") return
    onSearch(query)
    // Open YouTube search in a new tab as well
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query + " car review"
      )}`,
      "_blank"
    )
  }

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search cars by make, model, or year..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="search-btn">
        <span role="img" aria-label="search" style={{ marginRight: 6 }}>
          🔍
        </span>
        Search &amp; YouTube
      </button>
    </form>
  )
}

export default Search
