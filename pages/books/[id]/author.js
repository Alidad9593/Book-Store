import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

// component to show author's detail
export default function AuthorDetails({ author }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{author.name}</h1>
      <p>{author.biography}</p>
      <button onClick={() => router.push(`/books/${router.query.id}`)}>Back to Book</button>
    </div>
  );
}

// generate static paths generate for nested route 
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const paths = jsonData.books.map((book) => ({
    params: { id: book.id.toString() },
  }));

  return { paths, fallback: true };
}

// method to load author's data 
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const book = jsonData.books.find((book) => book.id === params.id);
  const author = jsonData.authors.find((author) => author.id === book.authorId);

  if (!author) {
    return { notFound: true };
  }

  return {
    props: {
      author,
    },
    revalidate: 10,
  };
}
