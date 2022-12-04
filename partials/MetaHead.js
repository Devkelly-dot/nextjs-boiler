import Head from 'next/head'

export default function MetaHead(props)
{
    return(
        <Head>
            {
                props.title?<title>{props.title}</title>:(<title>Site Name</title>)
            }
        </Head>
    )   
}