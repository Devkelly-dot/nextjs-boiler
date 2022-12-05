export default function Information({content})
{
    const styles = {
        gradient: {
          background: 'linear-gradient(90deg, #020024, #090979 0%, #00d4ff 100%)',
    }}    

    let panels = []
    panels.push(
        {
            "title":content.informationSubOneTitle,
            "description":content.informationSubOneDesc,
            "image":content.informationSubOneImage
        }
    )
    panels.push(
        {
            "title":content.informationSubTwoTitle,
            "description":content.informationSubTwoDesc,
            "image":content.informationSubTwoImage
        }
    )

    for(let j in panels)
    {
        //description replacements
        const regex_upper = /<i/
        panels[j].description = panels[j].description.replace(regex_upper,'<i class="font-normal text-sm"')
        const regex_title = /<b>/
        panels[j].description = panels[j].description.replace(regex_title,'<b class="font-extrabold text-xl">')

        //regex only happens on first match, so have to cycle through the html and replace all instances of <p until there are none left (when the new string doesn't change)
        const regex_body = /<p data/
        for(;;)
        {
            let new_content = panels[j].description.replace(regex_body,'<p class="text-base font-normal" data')
            if(new_content === panels[j].description)
            {
                break;
            }
            panels[j].description = new_content;
        }
    }

    return(
        <section className="bg-white border-b py-8">
            <div className="container max-w-5xl mx-auto m-8">
                <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                {content.informationTitle}
                </h2>
                <div className="w-full mb-4">
                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                {panels.map((panel,index)=>(
                    <div key={panel.title}>
                        {index%2===0?
                            <div className="flex flex-wrap">
                                <div className="w-5/6 sm:w-1/2 p-6">
                                    <div className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                    {panel.title}
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: panel.description}}></div>
                                </div>
                                <div className="w-full sm:w-1/2 p-6">
                                    <img src={panel.image} alt="vector image"></img>
                                </div>
                            </div>:(
                                <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                                    <div className="w-full sm:w-1/2 p-6 mt-6">
                                        <img src={panel.image} alt="vector image"></img>
                                    </div>
                                    <div className="w-full sm:w-1/2 p-6 mt-6">
                                        <div className="align-middle">
                                            <div className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                                {panel.title}
                                            </div>
                                            <div dangerouslySetInnerHTML={{__html: panel.description}}></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    ))
                }
            </div>
        </section>
    )
}