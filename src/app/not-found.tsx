import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-gray-500">
        Oops! This page does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition"
      >
        Go back home
      </Link>
    </main>
  );
}
