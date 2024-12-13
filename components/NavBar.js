import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

export default function NavBar({ toggleDarkMode }) { // Accept the toggleDarkMode prop
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/genres">Genres</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/authors">Authors</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
}
