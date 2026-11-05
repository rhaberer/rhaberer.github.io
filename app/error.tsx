"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="error-page">
      <p className="mono">A small interruption</p>
      <h1>Let’s try that again.</h1>
      <p>The page couldn’t load. Please give it another go.</p>
      <button onClick={reset}>Try again ↻</button>
    </main>
  );
}
