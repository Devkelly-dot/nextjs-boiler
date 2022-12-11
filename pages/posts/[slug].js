import authFetch from '../../lib/authFetch'
import MetaHead from "../../partials/MetaHead"
import BlogBody from '../../partials/blog/BlogBody'
import get_CMS_page_ids from '../../lib/get_CMS_page_Ids'
import Link from 'next/link'

export default function BlogPost(props)
{
    return (
        <>
            <MetaHead title={props.content.title}/>
            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
                        {props.content.title}
                    </a>
                    <div className="text-lg text-gray-600" dangerouslySetInnerHTML={{__html:props.content.intro}}>
                    </div>
                </div>
            </header>

            <nav className="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
                <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                    <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                        <Link href={"/posts"} className="hover:bg-gray-400 rounded py-2 px-4 mx-2">All</Link>
                        {
                            props.content.category_row.map((category)=><Link key={"category:"+category.value}
                                href={"/posts?type="+category.value} 
                                className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                            {category.value}</Link>)
                        }
                    </div>
                </div>
            </nav>


            <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full md:w-2/3 flex flex-col px-3">
                    <img src={props.post.cover_image_url}></img>
                    <div className='flex flex-wrap gap-4 my-4'>
                    {
                        props.post.tags.map((tag)=><Link key={"tag:"+tag} href={"/posts?type="+tag} className="text-blue-700 text-xs font-bold uppercase pb-4">{tag}</Link>)
                    }
                    </div>

                    <h1 className="text-3xl font-bold hover:text-gray-700 pb-4">{props.post.title}</h1>
                    <BlogBody blog_body = {props.post.body}/>
                </section>

                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">About Us</p>
                        <div className="pb-2" dangerouslySetInnerHTML={{__html:props.content.about}}></div>
                        <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                            Get to know us
                        </a>
                    </div>

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">Instagram</p>
                        <div className="grid grid-cols-3 gap-3">
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=2"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=3"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=4"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=5"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=6"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=7"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=8"/>
                            <img className="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=9"/>
                        </div>
                        <a href="#" className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                            <i className="fab fa-instagram mr-2"></i> Follow @Best Boiler
                        </a>
                    </div>

                </aside>

            </div>
        </>
    )
}

export async function getStaticPaths()
{
    let url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/?type=blog.BlogPage`
    const posts = await authFetch(url,{}).then((response)=>response.json())
    let post_titles = []
    //build post title array
    for(let i in posts.items)
    {
        post_titles.push({params:{slug:posts.items[i].meta.slug}})
    }

    return {
        paths:post_titles,
        fallback:'blocking'
    }

}

export async function getStaticProps(context)
{
    const page_ids = get_CMS_page_ids()
    const slug = context.params.slug;
    let url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/?slug=`+slug;
    const post_gen = await authFetch(url,{}).then((response)=>response.json())
    let id = 0
    if(post_gen.items.length>0)
    {
        id = post_gen.items[0].id
    }
    else 
    {
        return false 
    }

    url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/${id}`;
    const post = await authFetch(url,{}).then((response)=>response.json())

    url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/${page_ids["blogs"]}`
    const content = await authFetch(url,{}).then((response)=>response.json())

    return {
        props: {post:post, content:content}
    }
}