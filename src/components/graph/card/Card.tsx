import React from 'react';
import './card.css'

interface ParamType {
    name:string,
    value:number,
    classname:string
}

const Card:React.FC<ParamType> = ({name, value, classname }) => {
    return (
        <>
            <div className="card">
                <div className={classname+"-score"}>
                    <div className={classname+"-size"}>{name}</div>
                    <div className={classname+"-value"}>{value}</div>
                </div>
            </div>
           
        </>
    
    );
};

export default Card;