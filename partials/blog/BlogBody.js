export default function BlogBody(props)
{
    function generate_body()
    {
        const class_attributes = {
            'heading':{
                'className':'text-3xl',
                'tag':'<h2></h2>'
            },
            'paragraph':{
                'className':'text-base',
                'tag':'<div></div>'
            }
        }

        let body = ""

        for(let i in props.blog_body)
        {
            const type = props.blog_body[i].type 

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