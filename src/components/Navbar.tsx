import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Hero</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/experience">Experience</Link>
      <Link href="/links">Links</Link>
    </nav>
  );
}
