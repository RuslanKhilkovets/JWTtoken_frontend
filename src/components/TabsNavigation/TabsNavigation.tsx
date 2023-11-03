import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './TabsNavigation.scss';

export const TabsNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    const path = location.pathname;
    let activeTab = 1;

    if (path === '/tab2') {
      activeTab = 2;
    } else if (path === '/tab3') {
      activeTab = 3;
    } else if (path === '/tab4') {
      activeTab = 4;
    }

    setActiveTab(activeTab);
  }, [location.pathname]);

  const tabTitles = ['Вибір аналізів', 'Оформлення замовлення', 'Підтвердження даних', 'Оплата замовлення'];

  const tabsNavigateHandler = (tab: number) => {
    if (tab !== 4 && tab !== 3) {
      setActiveTab(tab);
      navigate(`/tab${tab}`);
    }
  };

  return (
    <div className="tabs-menu">
      <ul className="tabs-menu__list">
        {[1, 2, 3, 4].map((tabNumber) => (
          <li
            key={tabNumber}
            className={`tabs-menu__item ${
              activeTab === tabNumber ? 'tabs-menu__item_active' : ''
            }`}
            onClick={() => tabsNavigateHandler(tabNumber)}
          >
            <div
              className={`tabs-menu__number ${
                activeTab === tabNumber
                  ? 'tabs-menu__number_active'
                  : tabNumber < activeTab
                  ? 'tabs-menu__number_completed'
                  : ''
              }`}
            >
              <p className="tabs-menu__number--text">{tabNumber}</p>
            </div>
              <p className="tabs-menu__title">{tabTitles[tabNumber - 1]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsNavigation ;
