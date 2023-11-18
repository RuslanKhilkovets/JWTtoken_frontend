import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';

import Button from '../UI/Button/Button';


import cl from "./CookieBanner.module.scss"



const CookieBanner = () => {

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const isBannerAccepted = Cookies.get('cookieBannerAccepted');

    if (!isBannerAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookieBannerAccepted', 'true', { expires: 1 }); 
    setShowBanner(false);
  };

  const declineCookies = () => {
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className={cl.Cookie__Banner}>
        <p className={cl.Cookie__Title}>Цей сайт використовує файли кукі для покращення користувацького досвіду.</p>
        <div className={cl.Cookie__Buttons}>
            <Button active onClick={acceptCookies}>Прийняти куки</Button>
            <Button active onClick={declineCookies}>Заборонити куки</Button>
        </div>
      </div>
    )
  );
};

export default CookieBanner;
