import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function BookDetails({ book }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <p>Rating: {book.rating}</p>
      <button onClick={() => router.push(`/books/${book.id}/author`)}>View Author Details</button>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const paths = jsonData.books.map((book) => ({
    params: { id: book.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const book = jsonData.books.find((book) => book.id === params.id);

  if (!book) {
    return { notFound: true };
  }

  return {
    props: {
      book,
    },
    revalidate: 10,
  };
}
