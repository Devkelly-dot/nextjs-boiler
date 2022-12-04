import Hero from "./Hero";
import Information from "./Information";

export default function Homepage({content})
{    
    return(
        <>
            <Hero content = {content}/>
            <Information content={content}/>
        </>
    )
}