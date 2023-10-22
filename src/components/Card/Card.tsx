import * as React from 'react';


import CustomSelect from '../UI/Select/Select';
import cl from "./Card.module.scss"



export const Card = ({className, title, children }: any) => {
    return (
        <div className={cl.Card +" " + className}>
            <p className={cl.Card__Title}>
                {title}
            </p>
            {children}
        </div>
    )
}

export default Card;