import * as React from 'react';
import cl from "./Tab3.module.scss"
import Card from '../../Card/Card';
import InfoAnalyses from '../../UI/InfoAnalyses/InfoAnalyses';
import { useSelector } from 'react-redux';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export const Tab3 = () => {

    const formData = JSON.parse(localStorage.getItem("formData"))
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


    const { shoppingCartItems } = useSelector((state: any) => state.shoppingCart);

    const navigate = useNavigate()

    const total = shoppingCartItems.reduce((acc: number, item: any) => {
        return acc + item.price;
      }, 0);
    console.log(shoppingCartItems)



    return(
        <div className={cl.Tab3}>
            <div className={cl.Tab3__Container}>
            <Card title="Информация о сдаче анализов">
                <InfoAnalyses icon="place" text={place} title="Пункт сдачи" />
                <InfoAnalyses icon="payment" text={paymentMethod} title="Тип оплати" />
                <InfoAnalyses icon="fio" text={`${surname} ${name} ${patronymic}`} title="ФИО" />
                <InfoAnalyses icon="birthday" text={dayjs(birthdayDate).format("DD/MM/YYYY")} title="Дата рождения" />
                <InfoAnalyses icon="phone" text={phone} title="Телефон" />
                <InfoAnalyses icon="email" text={email} title="Email" />
            </Card>

                <Card title="Перечень анализов">
                    <div className={cl.Tab3__Analyses}>
                        {
                            shoppingCartItems.length > 0 
                            ?
                            shoppingCartItems.map((item: any) => (
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