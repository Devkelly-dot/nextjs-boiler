import authFetch from '../../lib/authFetch'
import MetaHead from "../../partials/MetaHead"
import BlogBody from '../../partials/blog/BlogBody'

export default function BlogPost(props)
{
    return (
        <>
            <MetaHead title={props.post.title}/>
            <h1>{props.post.title}</h1>
            <BlogBody blog_body = {props.post.body}/>
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