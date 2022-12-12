import authFetch from '../lib/authFetch'
import MetaHead from "../partials/MetaHead"
import BlogBody from '../partials/blog/BlogBody'
import get_CMS_page_ids from '../lib/get_CMS_page_Ids'
import Link from 'next/link'
import PostBody from '../partials/PostBody'

export default function SitePage(props)
{
    return (
        <>
            <MetaHead title={props.post.title} description={props.post.intro}/>
            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <h1 className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
                        {props.post.title}
                    </h1>
                    <div className="text-lg text-gray-600" dangerouslySetInnerHTML={{__html:props.post.intro}}>
                    </div>
                </div>
            </header>

            <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full md:w-2/3 flex flex-col px-3">
                    <PostBody blog_body = {props.post.body}/>
                </section>

                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
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
    let url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/?type=sitepage.SitePage`
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

    return {
        props: {post:post}
    }
}