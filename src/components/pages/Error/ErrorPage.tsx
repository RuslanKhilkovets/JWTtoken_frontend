import * as React from 'react';
import cl from "./ErrorPage.module.scss"
import { Link } from 'react-router-dom';


export const ErrorPage = () => {
    return(
        <div className={cl.ErrorPage}>
            <h1>404</h1><p>The page you are looking for does not exist.</p>
            <Link to="../">На головну</Link>
        </div>
    )
}

export default ErrorPage;