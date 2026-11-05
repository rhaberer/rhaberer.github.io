import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <p className="mono">404 / An unexplored direction</p>
      <h1>Let’s find another way.</h1>
      <p>This page isn’t here, but there’s plenty to explore.</p>
      <Link href="/#work">Back to the work ↗</Link>
    </main>
  );
}
