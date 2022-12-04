import Head from 'next/head'

export default function MetaHead(props)
{
    return(
        <Head>
            {
                props.title?<title>{props.title}</title>:(<title>Site Name</title>)
            }
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="description" content="Simple landind page" />
            <meta name="keywords" content="" />
            <meta name="author" content="" />
        </Head>
    )   
}