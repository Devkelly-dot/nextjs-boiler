import MetaHead from "../../partials/MetaHead"
import Link from 'next/link'
import get_CMS_page_ids from '../../lib/get_CMS_page_Ids'
import authFetch from '../../lib/authFetch'
import { useState,  useEffect} from "react"

export default function BlogIndex(props)
{
    const display_num = 3
    const [displayedArticles,setDisplayedArticles] = useState([])
    const [client_page,setClientPage] = useState(0)

    function client_page_change(num)
    {
        const posts = props.posts.items

        if(posts.slice(display_num*client_page,(display_num*client_page)+(display_num)+1).length > 0)
        {
            setClientPage(num)
            setDisplayedArticles(posts)
        }
        else 
        {
            return;
        }
    }

    return(
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
                        {
                            props.content.category_row.map((category)=><Link key={"category:"+category.value}
                                href={"?type="+category.value} 
                                className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
                            {category.value}</Link>)
                        }
                    </div>
                </div>
            </nav>


            <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full md:w-2/3 flex flex-col items-center px-3">
                    <article className="flex flex-col shadow my-4">
                        <a href="#" className="hover:opacity-75">
                            <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1"/>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Technology</a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">Article</a>
                            <p href="#" className="text-sm pb-3">
                                By <a href="#" className="font-semibold hover:text-gray-800">David Grzyb</a>, Published on April 25th, 2020
                            </p>
                            <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                            <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </article>

                    <article className="flex flex-col shadow my-4">
                        <a href="#" className="hover:opacity-75">
                            <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=2"/>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Automotive, Finance</a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</a>
                            <p href="#" className="text-sm pb-3">
                                By <a href="#" className="font-semibold hover:text-gray-800">David Grzyb</a>, Published on January 12th, 2020
                            </p>
                            <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                            <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </article>

                    <article className="flex flex-col shadow my-4">
                        <a href="#" className="hover:opacity-75">
                            <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=3"/>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Sports</a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</a>
                            <p href="#" className="text-sm pb-3">
                                By <a href="#" className="font-semibold hover:text-gray-800">David Grzyb</a>, Published on October 22nd, 2019
                            </p>
                            <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                            <a href="#" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </article>

                    <div className="flex items-center py-8">
                        <a href="#" className="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center">1</a>
                        <a href="#" className="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center">2</a>
                        <a href="#" className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next <i className="fas fa-arrow-right ml-2"></i></a>
                    </div>

                </section>

                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">About Us</p>
                        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
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
                            <i className="fab fa-instagram mr-2"></i> Follow @dgrzyb
                        </a>
                    </div>

                </aside>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const page_size = 20
    const accept_params = [{"param":"page","value":0}, {"param":"type","value":null}]
    const page_ids = get_CMS_page_ids()

    //FETCH INDEX PAGE CONTEXT
    let url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/${page_ids["blogs"]}`
    const content = await authFetch(url,{}).then((response)=>response.json())
    
    //FETCH BLOGS   
    url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/?type=blog.BlogPage&limit=${page_size}`
    for(let i in accept_params)
    {   
        if(context.query[accept_params[i].param])
        {
            const param_value = context.query[accept_params[i].param]
            const param = accept_params[i].param

            switch(param)
            {
                case "page":
                    if(param_value > 1)
                    {
                        url+="&offset="+String(page_size*(param_value-1))
                    }
                break;
                
                case "type":
                    const types = param_value.split(",")
                    url+="&tags="
                    for(let j in types)
                    {
                        if(j!=="0" && j!==0)
                            url+=","
                        url+=types[j]
                    }
                break;
            }
        }
    }

    let posts = await authFetch(url,{}).then((response)=>response.json())
    return {
        props: {posts:posts, content:content}, // will be passed to the page component as props
    }
  }