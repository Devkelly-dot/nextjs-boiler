import MetaHead from "../../partials/MetaHead"
import Link from 'next/link'

export default function BlogIndex()
{
    return(
        <>
            <MetaHead title="Our Posts"/>
            <h1>Our Posts</h1>
            <ul>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
            </ul>
        </>
    )
}