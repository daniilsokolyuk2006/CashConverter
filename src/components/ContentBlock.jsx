import ContentCard from "./ContentCard"
export default function ContentBlock ({cardTitles= [], texts = [], media, cards = 1, background = "basic", icons=[]}) {
const cardsCount = Array.from({length: cards});

    return(
        <>
            <div className={`content-background ${background == "primary"? "active" : ""}`}>

                {cardsCount.map((_,index) => (
                    <ContentCard
                        key = {index}
                        text = {texts[index] || "Default text"}
                        cardTitle = {cardTitles[index] || " "}
                        icon = {icons[index]}
                />
                    
                ))}
                
                
                {media && <div className="content-media"><video src={media} autoPlay loop muted className="content-media"/></div>}
            </div>
        </>
    )
}