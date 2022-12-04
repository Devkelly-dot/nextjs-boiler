export default function Information({content})
{
    const styles = {
        gradient: {
          background: 'linear-gradient(90deg, #020024, #090979 0%, #00d4ff 100%)',
    }}

    let descriptions = []
    descriptions.push(content.getStartedDescriptionOne)
    descriptions.push(content.getStartedDescriptionTwo)
    descriptions.push(content.getStartedDescriptionThree)

    for(let j in descriptions)
    {
        const regex_upper = /<i/
        descriptions[j] = descriptions[j].replace(regex_upper,'<i class="font-normal text-sm"')
        const regex_title = /<b>/
        descriptions[j] = descriptions[j].replace(regex_title,'<b class="font-extrabold text-xl">')

        //regex only happens on first match, so have to cycle through the html and replace all instances of <p until there are none left (when the new string doesn't change)
        const regex_body = /<p data/
        for(;;)
        {
            let new_content = descriptions[j].replace(regex_body,'<p class="text-base font-normal" data')
            if(new_content === descriptions[j])
            {
                break;
            }
            descriptions[j] = new_content;
        }
    }
    

    

    return(
        <section className="bg-white border-b py-8">
            <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    {content.getStartedTitle}
                </h2>

                <div className="w-full mb-4">
                    <div className="h-1 mx-auto w-64 opacity-25 my-0 py-0 rounded-t" style={styles.gradient}></div>
                </div>
                {
                    descriptions.map((description,index)=>(
                        <div key={index} className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                            <a href="#" className="flex flex-wrap no-underline hover:no-underline">
                                <div className="w-full font-bold text-xl text-gray-800 px-6">
                                    <div dangerouslySetInnerHTML={{__html: description}}></div>
                                </div>
                            </a>
                            </div>
                            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                            <div className="flex items-center justify-start">
                                <button 
                                    style={styles.gradient}
                                    className="mx-auto lg:mx-0 hover:underline text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                Action
                                </button>
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}