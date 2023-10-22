import * as React from 'react';

import { useNavigate } from 'react-router-dom';


import Card from '../../Card/Card';
import InfoAnalyses from '../../UI/InfoAnalyses/InfoAnalyses';
import Button from '../../UI/Button/Button';

import cl from "./DataConfirmation.module.scss";







const renderInfoAnalyses = (data) => {
  const { place, paymentMethod, surname, name, patronymic, birthdayDate, phone, email } = data;

  const infoItems = [
    { icon: "place", text: place, title: "Пункт сдачи" },
    { icon: "payment", text: paymentMethod, title: "Тип оплати" },
    { icon: "fio", text: `${surname} ${name} ${patronymic}`, title: "ФИО" },
    { icon: "birthday", text: birthdayDate, title: "Дата рождения" },
    { icon: "phone", text: phone, title: "Телефон" },
    { icon: "email", text: email, title: "Email" },
  ];

  return (
    <Card title="Информация о сдаче анализов">
        {infoItems.map((item, index) => (
            <InfoAnalyses key={index} icon={item.icon} text={item.text} title={item.title} />
        ))}
    </Card>
  );
};


export const Tab3 = () => {
    const navigate = useNavigate();

    const formDataString = localStorage.getItem("formData");
    const shoppingCartString = localStorage.getItem("shoppingCart");

    const formData = formDataString ? JSON.parse(formDataString) : {};
    const shoppingCart = shoppingCartString ? JSON.parse(shoppingCartString) : {};

    const total = shoppingCart.reduce((acc, item) => acc + item.price, 0);

    const handleRedirectToCompletePage = () => {
        localStorage.removeItem("shoppingCart");
        navigate("../../payload");
    };

    return (
        <div className={cl.Tab3}>
            <div className={cl.Tab3__Container}>

                {renderInfoAnalyses(formData)}

                <Card title="Перечень анализов">
                    <div className={cl.Tab3__Analyses}>

                        {
                            shoppingCart.length > 0 
                            ? 
                            (
                                shoppingCart.map((item, index) => (
                                    <div key={index} className={cl.Tab3__Analys}>
                                        <p className={cl.Tab3__Text}>{item.description}</p>
                                        <p className={cl.Tab3__Text}>{item.price}</p>
                                        <p className={cl.Tab3__Total}>Разом: {total}</p>
                                    </div>
                                ))
                            ) 
                            : 
                            (
                                <p className={cl.Tab3__NoItems}>Немає аналізів</p>
                            )
                        }
                    </div>
                </Card>
            </div>
            <div className={cl.Tab3__ButtonContainer}>
                <Button active className={cl.Tab3__Button} onClick={handleRedirectToCompletePage}>
                    Подтвердить заказ
                </Button>
            </div>
        </div>
    );
};

export default Tab3;