"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold">Something went wrong</h1>

      <p className="mt-4 text-gray-500">
        An unexpected error occurred.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-3 border rounded-lg hover:bg-black hover:text-white transition"
      >
        Try again
      </button>
    </main>
  );
}
