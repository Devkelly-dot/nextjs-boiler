import Link from "next/link"

export default function Navbar()
{
    return(
        <nav className="grid grid-cols-2 px-5 py-2 text-lg w-full fixed bg-white opacity-50 hover:opacity-100 ease-in-out duration-300">
            <div>
                <Link href="/">Home</Link>
            </div>
            <div className="flex justify-end gap-4">
                <Link href="/about-us">About</Link>
                <Link href="/posts">Posts</Link>
            </div>  
        </nav>
    )
}
