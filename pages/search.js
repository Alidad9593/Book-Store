import { useState, useEffect } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const handleSearch = () => {
    fetch('/data/books.json')
      .then((response) => response.json())
      .then((data) => {
        const results = data.books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        
        // Update search history
        const updatedHistory = [searchTerm, ...history].slice(0, 5); // keep recent 5 searches
        setHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Books</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a book..."
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px', marginBottom: '20px' }}>
        Search
      </button>

      <h3>Recent Searches:</h3>
      <ul>
        {history.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>

      <h3>Results:</h3>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <a href={`/books/${book.id}`} color='navy'>{book.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
