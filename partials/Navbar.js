import Link from "next/link"

export default function Navbar()
{
    return(
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about-us">About</Link>
            <Link href="/posts">Posts</Link>
        </nav>
    )
}
