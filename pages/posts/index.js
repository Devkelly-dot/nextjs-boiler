import MetaHead from "../../partials/MetaHead"
import Link from 'next/link'
import get_CMS_page_ids from '../../lib/get_CMS_page_Ids'
import authFetch from '../../lib/authFetch'
import { useState,  useEffect} from "react"
import { useRouter } from 'next/router'
import BlogList from '../../partials/blog/BlogList'
export default function BlogIndex(props)
{
    const router = useRouter()
    const display_num = 5 // how many articles we display at on the screen

    const [loadedArticles,setLoadedArticles] = useState(props.posts.items) // store every article we grab from the CMS here
    const [displayedArticles,setDisplayedArticles] = useState([]) // The articles being displayed on the blog index page
    const [client_page,setClientPage] = useState(0) // what page the client is on (displayed at the bottom of the blog index page)
    const [server_page,setServerPage] = useState(props.routerInfo.page) // what page the server is on for pagnation
    const [canAskServer,setCanAskServer] = useState(true) // if we know the server has no more articles - don't keep asking
    
    useEffect(()=>{
        function setDefaults()
        {
            setClientPage(0)
            setCanAskServer(true)
            setServerPage(props.routerInfo.page)
            setLoadedArticles(props.posts.items)
        }

        setDefaults() // we want to reset defaults when user clicks a new tag
        client_page_change(0,props.posts.items) // sending props.posts.items because this will be the new posts once we incorporate tag. loadedArticles state will not have updated yet.
    },[props.posts])

    async function client_page_change(num,posts)
    {
        //num = what page we are attempting to switch to (usually current page plus or minus 1)
        //posts = what array of articles we are working with 

        if(num < 0) // cannot go to page -1 
            return false
        

        if(posts.slice(display_num*num,display_num*num+display_num).length > 0)
        {
            setClientPage(num)
            setDisplayedArticles(posts.slice(display_num*num,display_num*num+display_num))
        }
        else if(canAskServer)
        {
            let url = props.routerInfo.url+"&offset="+(props.routerInfo.page_size*(server_page+1))
            let new_posts = await authFetch(url,{}).then((response)=>response.json())
            if(new_posts.items.length <= 0)
            {
                setCanAskServer(false)
                return false 
            }
            for(let i in new_posts.items)
            {
                posts.push(new_posts.items[i])
            }
            setLoadedArticles(posts)
            setClientPage(num)
            setServerPage(server_page+1)
            client_page_change(num,posts)
            return;
        }
    }

    return(
        <>
            <MetaHead title={props.content.title}/>
            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <h1 className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
                        {props.content.title}
                    </h1>
                    <div className="text-lg text-gray-600" dangerouslySetInnerHTML={{__html:props.content.intro}}>
                    </div>
                </div>
            </header>

            <nav className="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
                <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                    <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
                        <Link href={""} className="hover:bg-gray-400 rounded py-2 px-4 mx-2">All</Link>
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
 
                    <BlogList articles={displayedArticles} all={props.posts.items}/>
                    <div className="flex items-center py-8">
                        <div className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center mr-3 cursor-pointer" onClick={()=>client_page_change(client_page-1,loadedArticles)}>Previous <i className="fas fa-arrow-right ml-2"></i></div>
                        <div className="h-10 w-10 font-semibold text-gray-800 text-sm flex items-center justify-center cursor-pointer" onClick={()=>client_page_change(0,loadedArticles)}>1</div>
                        <div className="h-10 w-10 font-semibold bg-blue-600 text-white text-sm flex items-center justify-center">{client_page+1}</div>
                        <div className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3 cursor-pointer" onClick={()=>client_page_change(client_page+1,loadedArticles)}>Next <i className="fas fa-arrow-right ml-2"></i></div>
                    </div>

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

export async function getServerSideProps(context) {
    let page = 0
    const page_size = 20
    const accept_params = [{"param":"page","value":0}, {"param":"type","value":null}]
    const page_ids = get_CMS_page_ids()

    //FETCH INDEX PAGE CONTEXT
    let url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/${page_ids["blogs"]}`
    const content = await authFetch(url,{}).then((response)=>response.json())
    
    //FETCH BLOGS   
    url = process.env.NEXT_PUBLIC_REACT_APP_API+`homeContent/?type=blog.BlogPage&fields=cover_image_url,intro&limit=${page_size}`
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
                        page = param_value
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
    const routerInfo={"url":url,"page_size":page_size,"page":page}
    return {
        props: {posts:posts, content:content, routerInfo:routerInfo}, // will be passed to the page component as props
    }
  }