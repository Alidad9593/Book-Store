import Link from "next/link";
export default function Custom404() {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>Return to Home</Link>
      </div>
    );
  }
  