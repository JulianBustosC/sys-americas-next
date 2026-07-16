import "./Card.css";

const Card = ({titulo, value, children}) => {
    
    return (
        <div className="card">
            <div className="content">
                <span>{value}</span>
                <strong>{titulo}</strong> 
            </div>
            <div className="icon_container">
                {children}
                </div>

        </div>
    );
}

export default Card;