import * as React from 'react';
import cl from "./Card.module.scss"
import CustomSelect from '../UI/Select/Select';


const options = [
    {id: 1, name:"Kyiv", value: "Kyiv"},
    {id: 2, name:"Lviv", value: "Lviv"},
    {id: 3, name:"Kharkiv", value: "Kharkiv"},

]
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