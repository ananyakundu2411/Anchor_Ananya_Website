import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center pt-24">
      <div className="spotlight-top absolute inset-x-0 top-0 h-96" aria-hidden />
      <div className="container-site relative text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-ivory sm:text-6xl">
          This Stage Is <span className="gold-text">Empty</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ivory-dim">
          The page you&rsquo;re looking for has left the venue. Let&rsquo;s get you back
          to the show.
        </p>
        <div className="mt-8">
          <Link href="/" className="btn-gold">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
