import Link from 'next/link'

export default function BlogBody(props)
{
    return(

        <>
        {
            props.articles.length>0?props.articles.map((post)=>
                <article className="flex flex-col shadow my-4" key={post.title}>
                    <Link href={`/posts/${post.meta.slug}`} className="hover:opacity-75">
                        <img src={post.cover_image_url}/>
                    </Link>
                    <div className="bg-white flex flex-col justify-start p-6">
                        <Link href={`/posts/${post.meta.slug}`} className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</Link>
                        <Link href={`/posts/${post.meta.slug}`} className="pb-6">{post.intro}...</Link>
                        <Link href={`/posts/${post.meta.slug}`} className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></Link>
                    </div>
                </article>):(
                    props.all.map((post)=>
                    <article key={post.title}>
                        <Link href={`/posts/${post.meta.slug}`} className="hover:opacity-75">
                            <img src={post.cover_image_url}/>
                        </Link>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <Link href={`/posts/${post.meta.slug}`} className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</Link>
                            <Link href={`/posts/${post.meta.slug}`} className="pb-6">{post.intro}...</Link>
                            <Link href={`/posts/${post.meta.slug}`} className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </article>
                    )
                )
            }
        </>
    )
}