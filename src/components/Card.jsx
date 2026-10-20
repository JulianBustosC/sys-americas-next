import "./Card.css";

const Card = ({titulo, value, children,fondo}) => {
    
    return (
        <div className="card" style={{  "--tone": fondo }}>
            <div className="icon_container" >
                {children}
            </div>
            <div className="content">
                <span>{value}</span>
                <strong>{titulo}</strong> 
                
                
            </div>
            

        </div>
    );
}

export default Card;