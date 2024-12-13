import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

// fetching authors'list dynamically via SWR
export default function Authors() {
    const { data, error } = useSWR('/data/books.json', fetcher);
  
    if (error) return <div>Failed to load authors</div>;
    if (!data) return <div>Loading...</div>;
  
    const authors = data.authors;
  
    return (
      <div>
        <h1>Authors</h1>
        <ul className="authors-list">
          {authors.map((author) => (
            <li key={author.id}>
              <p><strong>{author.name}</strong></p>
              <p>{author.biography}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
