import * as React from 'react';
import cl from "./Button.module.scss"
import IButtonProps from '../../../types/IButtonProps';


const Button: React.FC<IButtonProps> = ({ children, onClick, active, className, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${cl.Button} ${active ? cl.Button_Current : ""} ${className}`}>
            <p className={cl.Button__Text}>
                {children}
            </p>
        </button>
    );   
}

export default Button;
