import * as React from 'react';
import cl from "./Button.module.scss"

interface IButtonProps {
    children: React.ReactNode;
    active?: boolean;
    className?: string;
}

const Button: React.FC<IButtonProps> = ({ children, active, className }) => {
    return (
        <button className={`${cl.Button} ${active ? cl.Button_Current : ""} ${className}`}>
            <p className={cl.Button__Text}>
                {children}
            </p>
        </button>
    );   
}

export default Button;
