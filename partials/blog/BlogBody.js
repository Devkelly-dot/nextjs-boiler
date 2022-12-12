export default function BlogBody(props)
{
    let tableOfContents = []
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
            if(type==='heading')
            {
                let re = new RegExp('<b>.*</b>')                    
                let table_item = re.exec(props.blog_body[i].value)
                if(table_item)
                    table_item = table_item[0]
                else
                {
                    re = new RegExp('>.*<')   
                    table_item = re.exec(props.blog_body[i].value)
                    if(table_item)
                        table_item = table_item[0]
                    else
                    {
                        body+=class_attributes[type].tag.replace('>',' class="'+class_attributes[type].className+'">'+props.blog_body[i].value)
                        continue
                    }
                }

                table_item = table_item.replace('<b>','')
                table_item = table_item.replace('</b>','')
                table_item = table_item.replace('>','')
                table_item = table_item.replace('<','')
                tableOfContents.push(table_item)
                body+=class_attributes[type].tag.replace('>',' class="'+class_attributes[type].className+'"id="'+table_item+'">'+props.blog_body[i].value)
                continue
            }
            body+=class_attributes[type].tag.replace('>',' class="'+class_attributes[type].className+'">'+props.blog_body[i].value)
        }

        return body
    }
    
    const body = generate_body()
    
    return (
        <>
            <div className = "border-2 p-4">
                <h2 className="font-bold text-xl mb-2">Table of Contents</h2>
                <ol className = 'flex flex-col list-disc gap-y-2 mb-2 pl-3'>
                    {
                        tableOfContents.map((content)=>
                            <li key={"toc:"+content}><a href={"#"+content} className='text-blue-600 underline'>{content}</a></li>
                        )
                    }
                </ol>
            </div>
            <div dangerouslySetInnerHTML={{__html:body}}></div>
        </>
    )
}