import React, { useState } from "react"

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        margin: "24px 0",
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search cars by make, model, or year..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #bbb",
          fontSize: "1rem",
          minWidth: 220,
        }}
      />
      <button
        type="submit"
        className="search-btn"
        style={{
          background: "#1a237e",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  )
}

export default Search
