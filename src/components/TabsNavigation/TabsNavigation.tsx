import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import { getItemFromStorage } from '../../utils/localStorageItems';

import { useSelector } from 'react-redux';


import './TabsNavigation.scss';
import { useTranslation } from 'react-i18next';




export const TabsNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const items  = useSelector((state: any) => state.shoppingCart.shoppingCartItems);  
  const scrollItemRef = useRef(null);

  const [scrollSpace, setScrollSpace] = React.useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(1);


  const [isFormValid, setIsFormValid] = useState(false)

  const formItemsFromStorage = getItemFromStorage("formData");

  const { 
      place, 
      paymentMethod, 
      surname, 
      name, 
      patronymic, 
      birthdayDate, 
      phone, 
      email, 
      personalDataProcessing, 
      preparationRules,
      serviceAgreement,
  } = formItemsFromStorage;
  

  const validateForm = () => {
    const isFormValid = (
      surname &&
      name &&
      patronymic &&
      !!birthdayDate &&
      phone &&
      email &&
      place &&
      paymentMethod &&
      preparationRules &&
      personalDataProcessing &&
      serviceAgreement
    );
    setIsFormValid(!!isFormValid)
    if(isFormValid){
      return true;
    }
    return false;
  }

  
  useEffect(() => {
    const path = location.pathname;
    let activeTab = 1;
    setScrollSpace(0);

    if (path === '/tab2') {
      activeTab = 2;
      setScrollSpace(150);
    } else if (path === '/tab3') {
      activeTab = 3;
      setScrollSpace(418);
    } else if (path === '/tab4') {
      setScrollSpace(632);
      activeTab = 4;
    }

    setActiveTab(activeTab);
  }, [location.pathname]);


  const tabsNavigateHandler = (tab: number) => {
    if (tab === 2 && items.length !== 0) {
      setActiveTab(tab);
      navigate(`/tab${tab}`);
    } else if (tab === 3 && isFormValid && items.length !== 0) {
      setActiveTab(tab);
      navigate(`/tab${tab}`);
    } else if (tab === 1) {
      setActiveTab(tab);
      navigate(`/tab${tab}`);
    }
  };
  
  
  useEffect(() => {
    if (scrollItemRef.current) {
      scrollItemRef.current.scrollLeft = 180 * (activeTab - 1);
    }
  }, [scrollSpace]);

  
  useEffect(() => {
    validateForm();
  }, [formItemsFromStorage]);

  
  return (
    <div className="tabs-menu">
      <ul className="tabs-menu__list" ref={scrollItemRef}>
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
            <p className="tabs-menu__title">{t(`tabNavigation.tab${tabNumber}`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsNavigation;