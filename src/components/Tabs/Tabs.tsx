import * as React from 'react';
import "./Tabs.scss"
import { useNavigate } from 'react-router-dom';

export const Tabs: React.FC = () => {
    const navigate = useNavigate();

    const tabsNavigateHandler = (tab: number) => {
        navigate(`/main/tab${tab}`);
    }
    
    return(
        <div className="tabs-menu">
            <ul className="tabs-menu__list">
                <li className="tabs-menu__item" onClick={() => tabsNavigateHandler(1)}>
                    <div className="tabs-menu__number tabs-menu__number_completed">
                        <p className='tabs-menu__number--text'>1</p>
                    </div>
                    <p className="tabs-menu__title">
                        Вибір аналізів
                    </p>
                </li>
                <li className="tabs-menu__item" onClick={() => tabsNavigateHandler(2)}>
                    <div className="tabs-menu__number tabs-menu__number_active">
                        <p className='tabs-menu__number--text'>2</p>                    
                    </div>
                    <p className="tabs-menu__title">
                        Оформлення замовлення
                    </p>
                </li>
                <li className="tabs-menu__item" onClick={() => tabsNavigateHandler(3)}>
                    <div className="tabs-menu__number" >
                        <p className='tabs-menu__number--text'>3</p>  
                    </div>
                    <p className="tabs-menu__title">
                        Підтвердження даних
                    </p>
                </li>
                <li className="tabs-menu__item" onClick={() => tabsNavigateHandler(4)}>
                    <div className="tabs-menu__number">
                        <p className='tabs-menu__number--text'>4</p>  
                    </div>
                    <p className="tabs-menu__title">
                        Оплата замовлення
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default Tabs;
