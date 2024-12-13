import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Home() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/data/books.json')
      .then((response) => response.json())
      .then((data) => setBooks(data.books));
  }, []);

  const viewGenres = () => {
    router.push('/genres');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' , color: 'Red'}}>Book Store</h1>
      <button onClick={viewGenres} style={{ margin: '0 700px' }}>View Genres</button>
      <h2>Featured Books</h2>
      <ul>
        {books.slice(0, 5).map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Price: ${book.price}</p>
            <p>Rating: {book.rating}</p>
            <button onClick={() => router.push(`/books/${book.id}`)}>View Details</button>
          </li>
        ))}
      </ul>
      </div>
    );
}
