import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
        <p className="mt-4 text-lg">Get started by editing <code className="bg-gray-200 p-1 rounded">app/page.tsx</code></p>
        <Link href="/home" className="mt-4 text-blue-500 hover:underline">Home page</Link>
        <Link href="/about" className="mt-4 text-blue-500 hover:underline">Learn more about us</Link>

      </div>
    </main>
  );
}
