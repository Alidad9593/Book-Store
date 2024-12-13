import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

// show genre list
export default function Genres({ genres }) {
  const router = useRouter();

  return (
    <div>
      <h1>Genres</h1>
      <ul className="genres-list">
        {genres.map((genre) => (
          <li key={genre.id}>
            <a onClick={() => router.push(`/genres/${genre.id}`)}>{genre.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// generating static props
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return {
    props: {
      genres: jsonData.genres,
    },
    revalidate: 10, // ISR
  };
}
