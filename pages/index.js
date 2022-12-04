import MetaHead from '../partials/MetaHead'
import get_CMS_page_ids from '../lib/get_CMS_page_Ids'
import authFetch from '../lib/authFetch'
import Homepage from '../partials/pages/Homepage'

export default function Home({content}) {
  return (
    <>
      <MetaHead title={content.title}/>
      <Homepage content = {content}/>
    </>
  )
}

export async function getStaticProps(context) {
  const page_ids = get_CMS_page_ids()
  const url = `http://127.0.0.1:8000/api/v2/homeContent/${page_ids["home"]}`
  let content = await authFetch(url,{}).then((response)=>response.json())
  
  return {
    props: {
      content:content,
    }, // will be passed to the page component as props
  }
}