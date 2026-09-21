import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>A little off the beaten path.</h1>
      <p>This page doesn’t exist. Let’s get you back to the portfolio.</p>
      <Link className="button primary" href="/">
        Back home →
      </Link>
    </main>
  );
}
