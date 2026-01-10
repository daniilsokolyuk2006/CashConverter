

export default function ContentCard (props) {
    return (
        
        
        <div className="content-card">
            {props.cardTitle && <h1>{props.cardTitle}</h1>}
            {props.text.split("\n\n").map((parag,index) => (
                <p key={index} className="content-text">{parag}</p>
            ))}
            {/* <div className="content-text">{props.text}</div> */}
            {props.icon && <i className={props.icon}></i>}
        </div>
        
    )
}