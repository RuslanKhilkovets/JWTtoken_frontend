import * as React from 'react';
import cl from "./Tab3.module.scss"
import Card from '../../Card/Card';
import InfoAnalyses from '../../UI/InfoAnalyses/InfoAnalyses';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

export const Tab3 = () => {

    const formDataString = localStorage.getItem("formData");
    const shoppingCartString = localStorage.getItem("shoppingCart");

    const formData = formDataString ? JSON.parse(formDataString) : {};
    const shoppingCart = shoppingCartString ? JSON.parse(shoppingCartString) : [];

    const { 
        place, 
        paymentMethod, 
        surname, 
        name, 
        patronymic,
        birthdayDate,
        phone,
        email
    } = formData;


    const navigate = useNavigate()

    const total = shoppingCart.reduce((acc: number, item: any) => {
        return acc + item.price;
    }, 0);



    return(
        <div className={cl.Tab3}>
            <div className={cl.Tab3__Container}>
            <Card title="Информация о сдаче анализов">
                <InfoAnalyses icon="place" text={place} title="Пункт сдачи" />
                <InfoAnalyses icon="payment" text={paymentMethod} title="Тип оплати" />
                <InfoAnalyses icon="fio" text={`${surname} ${name} ${patronymic}`} title="ФИО" />
                <InfoAnalyses icon="birthday" text={birthdayDate} title="Дата рождения" />
                <InfoAnalyses icon="phone" text={phone} title="Телефон" />
                <InfoAnalyses icon="email" text={email} title="Email" />
            </Card>
            <Card title="Перечень анализов">
                <div className={cl.Tab3__Analyses}>
                    {
                        shoppingCart.length > 0 
                        ?
                        shoppingCart.map((item: any) => (
                            <div className={cl.Tab3__Analys}>
                                <p className={cl.Tab3__Text}>{item.description}</p>
                                <p className={cl.Tab3__Text}>{item.price}</p>
                            </div>
                        ))
                        :
                        <p className={cl.Tab3__NoItems}>
                            Немає аналізів
                        </p>
                    }
                    <p className={cl.Tab3__Total}>Разом: {total}</p>
                </div>
            </Card>
            </div>
            <div className={cl.Tab3__ButtonContainer}>
                <Button active className={cl.Tab3__Button} onClick={() => navigate("../../payload")}>Подтвердить заказ</Button>
            </div>
        </div>
    )
}

export default Tab3;