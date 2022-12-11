export default function BlogBody(props)
{
    function generate_body()
    {
        const class_attributes = {
            'heading':{
                'className':'text-xl py-3',
                'tag':'<h2></h2>'
            },
            'paragraph':{
                'className':'text-base py-3',
                'tag':'<div></div>'
            },
            'image_url':{
                'className':'',
                'tag':'<img></img>'
            }
        }

        let body = ""

        for(let i in props.blog_body)
        {
            const type = props.blog_body[i].type 
            if(type === 'image_url')
            {
                body+=`<img src="${props.blog_body[i].value}" class="${class_attributes[type].tag}"/>`
                continue
            }
            body+=class_attributes[type].tag.replace('>',' class="'+class_attributes[type].className+'">'+props.blog_body[i].value)
        }

        return body
    }
    
    const body = generate_body()
    
    return (
        <>
            <div dangerouslySetInnerHTML={{__html:body}}></div>
        </>
    )
}