export default function BlogBody(props)
{
    return(

        <>
        {
            props.articles.length>0?props.articles.map((post)=>
                <article className="flex flex-col shadow my-4" key={post.title}>
                    <a href="#" className="hover:opacity-75">
                        <img src={post.cover_image_url}/>
                    </a>
                    <div className="bg-white flex flex-col justify-start p-6">
                        <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</a>
                        <a href="#" className="pb-6">{post.intro}...</a>
                        <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
                    </div>
                </article>):(
                    props.all.map((post)=>
                    <article key={post.title}>
                        <a href="#" className="hover:opacity-75">
                            <img src={post.cover_image_url}/>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</a>
                            <a href="#" className="pb-6">{post.intro}...</a>
                            <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </article>
                    )
                )
            }
        </>
    )
}