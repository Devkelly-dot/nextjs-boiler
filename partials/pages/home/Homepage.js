import Hero from "./Hero";
import GetStarted from "./GetStarted";
import Information from "./Information";

export default function Homepage({content})
{    
    return(
        <>
            <Hero content = {content}/>
            <Information content={content}/>
            <GetStarted content={content}/>
        </>
    )
}