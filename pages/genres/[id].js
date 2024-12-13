import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function GenreBooks({ books, genre }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Books in {genre.name}</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <button onClick={() => router.push(`/books/${book.id}`)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const paths = jsonData.genres.map((genre) => ({
    params: { id: genre.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const genre = jsonData.genres.find((g) => g.id === params.id);
  const books = jsonData.books.filter((book) => book.genreId === genre.id);

  if (!genre) {
    return { notFound: true };
  }

  return {
    props: {
      genre,
      books,
    },
    revalidate: 10,
  };
}
